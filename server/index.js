const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API
app.use('/api', require('./api'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
