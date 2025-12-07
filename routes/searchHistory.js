import express from 'express';
import SearchHistory from '../models/SearchHistory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user's search history
router.get('/', protect, async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(50);

    res.json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch search history'
    });
  }
});

// Save a new search to history
router.post('/', protect, async (req, res) => {
  try {
    const { symptoms, disease, severity, fileName } = req.body;

    const searchEntry = await SearchHistory.create({
      userId: req.user._id,
      symptoms,
      disease,
      severity,
      fileName: fileName || null
    });

    res.status(201).json({
      success: true,
      data: searchEntry
    });
  } catch (error) {
    console.error('Error saving search history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save search history'
    });
  }
});

// Clear user's search history
router.delete('/', protect, async (req, res) => {
  try {
    await SearchHistory.deleteMany({ userId: req.user._id });

    res.json({
      success: true,
      message: 'Search history cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing search history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear search history'
    });
  }
});

// Delete a specific search entry
router.delete('/:id', protect, async (req, res) => {
  try {
    const searchEntry = await SearchHistory.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!searchEntry) {
      return res.status(404).json({
        success: false,
        message: 'Search entry not found'
      });
    }

    await searchEntry.deleteOne();

    res.json({
      success: true,
      message: 'Search entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting search entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete search entry'
    });
  }
});

export default router;
