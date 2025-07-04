require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo connected'));

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
