const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));
} else {
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

// ROUTES
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const storageRouter = require('./routes/storage');
app.use('/storage', storageRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
