import axios from 'axios';

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.co/models/';

// Using a medical text analysis model
const MODEL = 'microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract-fulltext';

export async function analyzeWithHuggingFace(text) {
  if (!HUGGING_FACE_API_KEY) {
    console.log('No Hugging Face API key configured, using rule-based system');
    return null;
  }

  try {
    console.log('Analyzing with Hugging Face AI...');
    
    // Use Hugging Face's feature extraction to understand the medical text
    const response = await axios.post(
      `${HF_API_URL}${MODEL}`,
      { inputs: text },
      {
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    console.log('Hugging Face analysis complete');
    return response.data;
  } catch (error) {
    console.error('Hugging Face API error:', error.response?.data || error.message);
    return null;
  }
}

// Alternative: Use a text generation model for medical analysis
export async function generateMedicalInsights(symptoms) {
  if (!HUGGING_FACE_API_KEY) {
    return null;
  }

  try {
    const prompt = `Analyze these medical symptoms and provide a brief assessment: ${symptoms}`;
    
    const response = await axios.post(
      `${HF_API_URL}meta-llama/Llama-2-7b-chat-hf`,
      {
        inputs: prompt,
        parameters: {
          max_length: 200,
          temperature: 0.7
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    return response.data;
  } catch (error) {
    console.error('Hugging Face generation error:', error.response?.data || error.message);
    return null;
  }
}
