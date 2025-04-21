const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  links: {
    type: [String],
    validate: {
      validator: arr => arr.every(link => typeof link === 'string' && link.startsWith('http')),
      message: 'All links must be valid URLs',
    },
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
