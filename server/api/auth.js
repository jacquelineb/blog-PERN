const express = require('express');
const router = express.Router();
const passport = require('passport');
const initializePassport = require('../passport-config');
const authMiddleware = require('../utils/authMiddleware');

initializePassport(passport);

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
