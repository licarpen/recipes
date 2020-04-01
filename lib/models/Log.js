const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipe_id: {
    type: String,
    required: true
  },
  date: [String],
  notes: [String],
  rating: {
    type: Number,
    min: 0,
    max: 10
  }
});

module.exports = mongoose.model('Log', schema);
