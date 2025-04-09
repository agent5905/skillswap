const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['mentee', 'mentor', 'admin'], default: 'mentee' },
  skills: [String],
  bio: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
