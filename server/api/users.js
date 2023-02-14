const pool = require('../db');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

// Get user's public info
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await pool.query(
      `SELECT username, bio, avatar FROM blog_user WHERE LOWER(username) = LOWER($1)`,
      [username]
    );
    const userData = user.rowCount ? user.rows[0] : null;
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Edit current user's bio
router.put('/bio', authMiddleware.checkAuthenticated, async (req, res) => {
  try {
    const currUser = req.user.id;
    const { bio } = req.body;
    const userData = await pool.query(
      'UPDATE blog_user SET bio = $1 WHERE id = $2 RETURNING bio',
      [bio, currUser]
    );

    if (userData.rowCount) {
      res.status(200).json({ bio });
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Edit current user's avatar
router.put('/avatar', authMiddleware.checkAuthenticated, async (req, res) => {
  try {
    const currUser = req.user.id;
    const { avatar } = req.body;
    const userData = await pool.query(
      'UPDATE blog_user SET avatar = $1 WHERE id = $2 RETURNING avatar',
      [avatar, currUser]
    );

    if (userData.rowCount) {
      res.status(200).json('Successfully changed avatar');
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
