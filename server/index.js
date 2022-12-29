require('dotenv').config({ path: './.env' });
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('./passportConfig');
const db = require('./db');

// Environment varaibles
const port = process.env.PORT || 4000;

// Import routes
const userRouter = require('./routes/userRoute');
const printRouter = require('./routes/printRoute');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret: 'testXD',
  store: new MongoStore({
    client: db.connect(),
  }),
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Use imported API routes
app.use('/user', userRouter);
app.use('/print', printRouter);

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
