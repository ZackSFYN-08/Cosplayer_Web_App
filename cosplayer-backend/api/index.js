require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Hubungkan ke Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Definisi Rute
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Cosplayer Wardrobe API is running...');
});

// --- PERBAIKAN DI SINI ---
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// WAJIB: Export app agar bisa dibaca oleh Vercel
module.exports = app;