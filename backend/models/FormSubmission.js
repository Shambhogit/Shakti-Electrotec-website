const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'viewed', 'responded'],
    default: 'new'
  }
});

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);