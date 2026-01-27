const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Atlas connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error; // JANGAN process.exit
  }
};

module.exports = connectDB;
