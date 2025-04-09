const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role, secret } = req.body;

  const isAdmin = role === 'admin' && secret === process.env.ADMIN_SECRET;

  const userRole = isAdmin ? 'admin' : role || 'mentee';

  if (!['mentee', 'mentor', 'admin'].includes(userRole)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.json({ message: 'User created', user: { email: user.email, id: user._id } });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Profile
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.patch('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const updates = req.body;
    const user = await User.findByIdAndUpdate(decoded.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
});


module.exports = router;
