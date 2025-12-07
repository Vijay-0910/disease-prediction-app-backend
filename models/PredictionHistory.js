import mongoose from 'mongoose';

const predictionHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  symptomsMatch: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PredictionHistory = mongoose.model('PredictionHistory', predictionHistorySchema);

export default PredictionHistory;
