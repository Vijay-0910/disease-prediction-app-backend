import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import multer from 'multer';
import { createRequire } from 'module';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import searchHistoryRoutes from './routes/searchHistory.js';
import getDiseasePrediction from './services/diseasePrediction.js';
import { analyzeWithHuggingFace } from './services/huggingFace.js';
import SearchHistory from './models/SearchHistory.js';
import { protect } from './middleware/auth.js';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to extract text from uploaded files
async function extractTextFromFile(file) {
  try {
    const mimetype = file.mimetype;
    const buffer = file.buffer;

    // Handle PDF files
    if (mimetype === 'application/pdf') {
      try {
        console.log('Extracting text from PDF...');
        const data = await pdf(buffer);
        const extractedText = data.text.trim();
        console.log(`PDF extracted: ${extractedText.length} characters, ${data.numpages} pages`);

        if (extractedText.length > 0) {
          return extractedText;
        } else {
          return `[PDF file: ${file.originalname} - No text could be extracted. Please type your medical values.]`;
        }
      } catch (pdfError) {
        console.error('PDF extraction error:', pdfError);
        return `[PDF extraction failed. Please type your medical values from the PDF.]`;
      }
    }

    // Handle text files
    if (mimetype.startsWith('text/')) {
      return buffer.toString('utf-8');
    }

    // Handle plain files (no specific mimetype - treat as text)
    if (mimetype === 'application/octet-stream') {
      try {
        return buffer.toString('utf-8');
      } catch (e) {
        return `[Binary file: ${file.originalname}]`;
      }
    }

    // For images and other types, return placeholder
    if (mimetype.startsWith('image/')) {
      return `[Image file uploaded: ${file.originalname}. Image analysis will be added soon.]`;
    }

    // Try to read as text for other types
    try {
      const text = buffer.toString('utf-8');
      if (text.length > 0 && text.length < 100000) {
        return text;
      }
    } catch (e) {
      // Ignore and fall through
    }

    return `[File uploaded: ${file.originalname} - Type: ${mimetype}]`;

  } catch (error) {
    console.error('Error extracting text from file:', error);
    return `[Could not extract text from ${file.originalname}]`;
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/search-history', searchHistoryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Disease prediction endpoint (with file upload support)
// Note: protect middleware is optional - prediction works for both authenticated and guest users
app.post('/api/predict', upload.single('file'), async (req, res) => {
  // Check if user is authenticated (optional)
  let userId = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (error) {
      // User not authenticated, continue as guest
      console.log('Guest user - search history will not be saved');
    }
  }

  req.userId = userId;
  try {
    const { symptoms } = req.body;
    const uploadedFile = req.file;

    // Build symptoms text (combine text input and file content)
    let symptomsText = symptoms || '';

    // Extract text from uploaded file if present
    if (uploadedFile) {
      console.log('File uploaded:', {
        filename: uploadedFile.originalname,
        size: uploadedFile.size,
        mimetype: uploadedFile.mimetype
      });

      const extractedText = await extractTextFromFile(uploadedFile);

      if (symptomsText) {
        symptomsText += '\n\n--- Medical Report Content ---\n' + extractedText;
      } else {
        symptomsText = extractedText;
      }

      console.log('Extracted text length:', extractedText.length, 'characters');
    }

    if (!symptomsText.trim()) {
      return res.status(400).json({
        error: 'Please provide symptoms description or upload a medical report'
      });
    }

    // Try Hugging Face AI analysis first (optional enhancement)
    console.log('Processing symptoms:', symptomsText.substring(0, 100) + '...');

    // Optional: Get AI insights from Hugging Face (doesn't replace rule-based system)
    if (process.env.HUGGING_FACE_API_KEY) {
      try {
        await analyzeWithHuggingFace(symptomsText);
        // Note: Hugging Face analysis can be used to enhance predictions in future
        console.log('Hugging Face analysis completed (informational)');
      } catch (hfError) {
        console.log('Hugging Face analysis skipped:', hfError.message);
      }
    }

    // Use rule-based disease prediction service
    const prediction = getDiseasePrediction(symptomsText);
    console.log('Predicted disease:', prediction.disease);

    // Save to search history if user is authenticated
    if (req.userId) {
      try {
        await SearchHistory.create({
          userId: req.userId,
          symptoms: symptomsText.substring(0, 200),
          disease: prediction.disease,
          severity: prediction.severity,
          fileName: uploadedFile ? uploadedFile.originalname : null
        });
        console.log('Search saved to history for user:', req.userId);
      } catch (historyError) {
        console.error('Error saving to search history:', historyError.message);
        // Don't fail the request if history save fails
      }
    }

    res.json(prediction);

  } catch (error) {
    console.error('Error in disease prediction:', error.message);

    res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Using built-in AI prediction service');
});
