// console.log(require('crypto').randomBytes(64).toString('hex'));


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://PrathamDani:Pratham321@cluster1.uan8f.mongodb.net/Fresher_Task?retryWrites=true&w=majority&appName=Cluster1')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
