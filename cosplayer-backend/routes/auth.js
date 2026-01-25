const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // <-- DITAMBAHKAN: Untuk validasi input
const User = require('../models/User');
require('dotenv').config();

// @route   POST api/auth/register
// @desc    Register a new user
router.post(
  '/register',
  [
    // --- DITAMBAHKAN: Middleware untuk validasi input ---
    check('name', 'Nama tidak boleh kosong').not().isEmpty(),
    check('email', 'Mohon masukkan email yang valid').isEmail(),
    check('password', 'Password harus terdiri dari minimal 6 karakter').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // --- DITAMBAHKAN: Cek hasil validasi ---
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        // Pesan error diubah menjadi array agar konsisten dengan validator
        return res.status(400).json({ errors: [{ msg: 'User dengan email ini sudah ada' }] });
      }

      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { user: { id: user.id } };
      
      // Menggunakan environment variable untuk waktu expired token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '5h' }, // <-- DIPERBAIKI
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post(
  '/login',
  [
    // --- DITAMBAHKAN: Middleware untuk validasi input ---
    check('email', 'Mohon masukkan email yang valid').isEmail(),
    check('password', 'Password tidak boleh kosong').exists(),
  ],
  async (req, res) => {
    // --- DITAMBAHKAN: Cek hasil validasi ---
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      // Pesan error dibuat umum untuk keamanan (menghindari user enumeration)
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Email atau password salah' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Email atau password salah' }] });
      }

      const payload = { user: { id: user.id } };
      
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '5h' }, // <-- DIPERBAIKI
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;