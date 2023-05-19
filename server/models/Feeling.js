const mongoose = require('mongoose');

const FeelingSchema = new mongoose.Schema({
  emotion: String,
  description: String,
  recommendations: [String],
});

module.exports = mongoose.model('Feeling', FeelingSchema);
