if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

// MIDDLEWARE
app.use(express.json());

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

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
