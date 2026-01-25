const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Kita gunakan process.env.MONGODB_URI agar mengambil link dari file .env
    const mongoURI = process.env.MONGODB_URI; 
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB Atlas connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;