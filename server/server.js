if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');

// MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of local react app we're connecting with
    credentials: true,
  })
);

// ROUTES
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
