const express = require('express');
const router = express.Router();
const FormSubmission = require('../models/FormSubmission');

// Submit form data (public endpoint)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const submission = new FormSubmission({
      name,
      email,
      phone,
      message
    });

    await submission.save();
    res.status(201).send(submission);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all submissions (public - secured by your frontend auth)
router.get('/', async (req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });
    res.send(submissions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update submission status (public - secured by frontend)
router.patch('/:id', async (req, res) => {
  try {
    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!submission) {
      return res.status(404).send({ error: 'Submission not found' });
    }
    
    res.send(submission);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;