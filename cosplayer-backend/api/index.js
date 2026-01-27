const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get('/api', (req, res) => {
  res.send('API OK');
});

app.use('/api/products', require('../routes/products'));
app.use('/api/orders', require('../routes/orders'));
app.use('/api/auth', require('../routes/auth'));

module.exports = app;
