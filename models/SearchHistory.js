import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  symptoms: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Index for efficient queries
searchHistorySchema.index({ userId: 1, timestamp: -1 });

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

export default SearchHistory;
