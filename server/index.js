require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Environment varaibles
const port = process.env.PORT || 4000;
const uri = process.env.URI;

// Connect to MongoDB database
mongoose.set('strictQuery', true);
mongoose.connect(uri);
const database = mongoose.connection;

database.on('error', (err) => {
  console.error(err);
});

database.once('connected', () => {
  console.log('Database connected!');
});

// Import routes
const userRouter = require('./routes/userRoute');
const printRouter = require('./routes/printRoute');

const app = express();
app.use(cors());
app.use(express.json());

// Use imported API routes
app.use('/user', userRouter);
app.use('/print', printRouter);

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
