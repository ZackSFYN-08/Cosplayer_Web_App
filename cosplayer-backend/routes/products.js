const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET api/products
// @desc    Get all products (can also handle search via query param 'q')
router.get('/', async (req, res) => {
  try {
    const query = req.query.q;
    let products;
    
    if (query) {
      // If there's a search query, find products with a matching name (case-insensitive)
      products = await Product.find({ name: { $regex: query, $options: 'i' } });
    } else {
      // If no query, get all products
      products = await Product.find();
    }
    
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products/:id
// @desc    Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;