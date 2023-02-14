const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const pool = require('../db');
const initializePassport = require('../passport-config');
const authMiddleware = require('../utils/authMiddleware');

initializePassport(passport);

// Register a user
router.post('/register', authMiddleware.checkNotAuthenticated, async (req, res) => {
  console.log('in here');
  try {
    const { username, email, password } = req.body;

    // Validation
    const errorMessages = {};
    if (!username || !email || !password) {
      errorMessages.missingFields = 'Please enter all fields.';
    }

    const existingEmail = await pool.query(
      'SELECT id FROM blog_user WHERE LOWER(email) = LOWER($1)',
      [email]
    );
    if (existingEmail.rows.length > 0) {
      errorMessages.emailTaken = 'This email is already in use.';
    }

    const existingUsername = await pool.query(
      'SELECT id FROM blog_user WHERE LOWER(username) = LOWER($1)',
      [username]
    );
    if (existingUsername.rows.length > 0) {
      errorMessages.usernameTaken = 'This username is taken.';
    }

    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$');
    if (!passwordRegex.test(password)) {
      errorMessages.badPassword =
        'Please make sure password is at least 8 characters, containing a mix of numbers and uppercase and lowercase letters.';
    }

    if (Object.keys(errorMessages).length) {
      res.status(401).json(errorMessages);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO blog_user (username, email, hashed_password) VALUES ($1, LOWER($2), $3)',
        [username, email, hashedPassword]
      );

      res.status(200).json('Successfully registered user');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server error');
  }
});

// Log a user in
router.post(
  '/login',
  authMiddleware.checkNotAuthenticated,
  passport.authenticate('local'),
  (req, res) => {
    res.status(200).json({ user: req.user.username });
  }
);

// Log a user out
router.delete('/logout', authMiddleware.checkAuthenticated, (req, res) => {
  req.logOut();
  res.status(200).json('Logout successful.');
});

// Verify user
router.get('/verify', (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.json({ isAuthenticated: true, user: req.user.username });
    } else {
      res.json({ isAuthenticated: false, user: null });
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
