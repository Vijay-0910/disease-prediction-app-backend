import express from 'express';
import PredictionHistory from '../models/PredictionHistory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/history
// @desc    Get user's prediction history
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const history = await PredictionHistory.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching history'
    });
  }
});

// @route   POST /api/history
// @desc    Save a prediction to history
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { symptoms, disease, severity, symptomsMatch } = req.body;

    const historyEntry = await PredictionHistory.create({
      userId: req.user._id,
      symptoms,
      disease,
      severity,
      symptomsMatch
    });

    res.status(201).json({
      success: true,
      history: historyEntry
    });
  } catch (error) {
    console.error('Save history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving history'
    });
  }
});

// @route   DELETE /api/history/:id
// @desc    Delete a history entry
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const history = await PredictionHistory.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: 'History entry not found'
      });
    }

    await history.deleteOne();

    res.json({
      success: true,
      message: 'History entry deleted'
    });
  } catch (error) {
    console.error('Delete history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting history'
    });
  }
});

export default router;
