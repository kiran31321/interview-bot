const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

const app = express();

// MongoDB Setup
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Models
const Question = require('./models/question'); // Correct path to the model

// Routes

// Fetch Questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions); // Send the fetched questions as a JSON response
  } catch (error) {
    res.status(500).send('Error fetching questions'); // Error handling
  }
});

// Submit Answer
app.post('/api/submit-answer', (req, res) => {
  const { question, answer } = req.body; // Destructure question and answer from the body
  console.log('Submitted Answer:', answer); // Log the answer
  res.status(200).send('Answer received'); // Send a success response back to the client
});

// Start the server
const PORT = process.env.PORT || 5000; // Use the PORT from .env or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server start message
});

