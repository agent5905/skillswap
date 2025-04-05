const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI); // Add MONGO_URI in your .env

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
