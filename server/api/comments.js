const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../utils/authMiddleware');

// Get comments for post
router.get('/', async (req, res) => {
  const { postId } = req.query;
  let { limit, offset } = req.query;
  if (!limit) {
    limit = 50;
  }
  if (!offset) {
    offset = 0;
  }

  try {
    const comments = await pool.query(
      `SELECT comment.id, blog_user.username as author, comment.body, comment.created_on
      FROM comment
      LEFT JOIN blog_user ON comment.author_id = blog_user.id
      WHERE comment.post_id = $1
      ORDER BY created_on DESC
      OFFSET $2 ROWS
      FETCH FIRST $3 ROW ONLY`,
      [postId, offset, limit]
    );

    res.status(200).json(comments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

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

// Create a comment
router.post('/', async (req, res) => {
  const { postId, body } = req.body;
  const authorId = req.user ? req.user.id : null;
  try {
    const response = await pool.query(
      'INSERT INTO comment (post_id, author_id, body) VALUES ($1, $2, $3) RETURNING id',
      [postId, authorId, body]
    );

    res.status(201).set('Location', `/${response.rows[0].id}`).send();
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Delete a comment
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
