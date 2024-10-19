const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  analysisField: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', analysisSchema);
