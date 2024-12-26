

const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');


// dotenv.config();
require('dotenv').config(); 



mongoose.connect('mongodb+srv://danipratham:Danipratham45@task.jxb7t.mongodb.net/?retryWrites=true&w=majority&appName=Task'
).then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));


