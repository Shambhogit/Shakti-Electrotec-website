require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shaktietech', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Form Submission Model (models/FormSubmission.js)
const formSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

// Routes
// Submit form data
app.post('/api/submissions', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const submission = new FormSubmission({ name, email, phone, message });
    await submission.save();
    res.status(201).send(submission);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


app.use(cors()); // Enable CORS if frontend is on another domain
app.use(express.json());
app.use('/api/products', productRoutes);

// Get all submissions (no auth needed since you're handling auth in frontend)
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });
    res.send(submissions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Simple route for testing
app.get('/', (req, res) => {
  res.send('ShaktiETech Backend Server');
});

// Server port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});