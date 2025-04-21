const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../utils/upload');

// Create a product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description } = req.body;
    const links = req.files.map(file => file.path);

    const product = new Product({ name, description, links });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/frontpage', async (req, res) => {
  try {
    const products = await Product.find().limit(6); // Limit to 6 products
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// Update product
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { name, description };

    if (req.files && req.files.length > 0) {
      const links = req.files.map(file => file.path);
      updateData.links = links;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
