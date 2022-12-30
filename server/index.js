require('dotenv').config({ path: './.env' });
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('./passportConfig');
const db = require('./db');

// Environment varaibles
const port = process.env.PORT || 4000;
const secret = process.env.SECRET;

// Import routes
const userRouter = require('./routes/userRoute');
const printRouter = require('./routes/printRoute');

// Start the Express server
const app = express();
// Ensure that only requests from accepted origins are used
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Establish the session with mongoose
app.use(session({
  secret,
  store: new MongoStore({
    client: db.connect(),
  }),
  resave: false,
  saveUninitialized: false,
}));

// Establish the session with passport
app.use(passport.initialize());
app.use(passport.session());

// Use imported API routes
app.use('/user', userRouter);
app.use('/print', printRouter);

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
