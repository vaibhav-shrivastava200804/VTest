const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionNumber: Number,
  question: String,
  options: {
    A: String,
    B: String,
    C: String,
    D: String,
  },
  answer: String
});

module.exports = mongoose.model('Question', questionSchema, 'Question'); 
// Make sure the third argument matches your MongoDB collection name
