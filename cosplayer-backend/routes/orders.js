const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// @route   POST api/orders
// @desc    Create a new order
router.post('/', async (req, res) => {
  const { productId, quantity, totalPrice } = req.body;

  if (!productId || !quantity || !totalPrice) {
    return res.status(400).json({ msg: 'Please provide all required order information.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    const newOrder = new Order({
      product: productId,
      quantity,
      totalPrice
    });

    const order = await newOrder.save();
    res.status(201).json({ msg: 'Order created successfully', order });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;