const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: false
  }
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  directions: [String],
  ingredients: [ingredientsSchema]
});

module.exports = mongoose.model('Recipe', schema);
