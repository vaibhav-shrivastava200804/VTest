import express from 'express';
import { connect, Schema, model } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Use env PORT if available

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Atlas connected');
  })
  .catch((err) => {
    console.log('MongoDB Error:', err);
  });

// Define schema
const questionSchema = new Schema({
  questionNumber: Number,
  question: String,
  options: Object,
  answer: String
});

// Define model
const Question = model('Question', questionSchema, 'Question');

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Question API!');
});

// GET all questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch questions' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
