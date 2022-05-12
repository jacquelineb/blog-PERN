const express = require('express');
const router = express.Router();
const pool = require('../db');

// Middleware
router.use(express.json());

// ===== Get a user ===== //
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query(
      'SELECT username, biography FROM blog_user WHERE username = $1',
      [username]
    );

    const user = result.rows[0];
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    res.status(500).json('Server Error');
  }
});

module.exports = router;
