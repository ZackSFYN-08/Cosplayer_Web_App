require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Inisialisasi aplikasi Express
const app = express();

// Hubungkan ke Database
connectDB();

// Middleware
app.use(cors()); // Mengizinkan permintaan dari domain lain (frontend)
app.use(express.json()); // Mem-parsing body request dalam format JSON

// Definisi Rute (Routes)
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));

// Rute dasar untuk mengecek apakah server berjalan
app.get('/', (req, res) => {
  res.send('Cosplayer Wardrobe API is running...');
});

// Menentukan Port
const PORT = process.env.PORT || 5001;

// Menjalankan server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));