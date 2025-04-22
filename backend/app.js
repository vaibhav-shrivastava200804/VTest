import express from 'express';
import { connect, Schema, model } from 'mongoose';
import cors from 'cors';  // Importing cors for your backend

import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = 3000; // Or any port you want

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Atlas connected');
  })
  .catch((err) => {
    console.log('MongoDB Error:', err);
  });

// Create schema
const questionSchema = new mongoose.Schema({
    questionNumber: Number,
    question: String,
    options: Object,
    answer: String
});

// Create model and specify the collection name explicitly
const Question = mongoose.model('Question', questionSchema, 'Question');

// Root route (for testing purposes)
app.get('/', (req, res) => {
    res.send('Welcome to the Question API!');
});

// GET all questions
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find({}); // Queries the 'Question' collection
        res.json(questions);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch questions' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
