require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB per request (AMAN UNTUK SERVERLESS)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Cosplayer Wardrobe API is running...');
});

// Local dev only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
  );
}

module.exports = app;
