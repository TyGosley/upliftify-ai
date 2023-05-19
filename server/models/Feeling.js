const { Schema, model } = require('mongoose');

const FeelingSchema = new Schema({
  emotion: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  positive: {
    type: Boolean,
    required: true,
  },
  recommendations: [String],
});

module.exports = model('Feeling', FeelingSchema);