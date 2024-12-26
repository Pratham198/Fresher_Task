const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); 
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: 'http://localhost:3000', // React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,}
)); // Enable Cross-Origin Resource Sharing

const taskReportsRoutes = require('./routes/taskReports');
const authRoutes = require('./routes/authRoutes');

// API Routes
app.use('/api/task-reports', taskReportsRoutes); // Task reports route
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
