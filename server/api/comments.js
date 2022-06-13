const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../utils/authMiddleware');

// Get comment
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      `SELECT comment.id, comment.body, comment.created_on, blog_user.username as author
      FROM comment
      LEFT JOIN blog_user ON comment.author_id = blog_user.id
      WHERE comment.id = $1`,
      [id]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Delete comment
router.delete('/:id', authMiddleware.checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;
    const comment = await pool.query(
      'DELETE FROM comment WHERE id = $1 AND author_id = $2 RETURNING *',
      [commentId, userId]
    );

    if (comment.rowCount) {
      res.status(200).send();
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
