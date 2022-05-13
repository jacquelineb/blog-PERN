const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await pool.query(
      `SELECT post.id, post.title, post.body, post.created_on, blog_user.username
      FROM post
      INNER JOIN blog_user
      ON post.author_id = blog_user.id ORDER BY created_on DESC`
    );
    res.status(200).json(allPosts.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Create a post
router.post('/create', async (req, res) => {
  try {
    if (req.user) {
      const user_id = req.user.id;
      const { title, body } = req.body;
      await pool.query('INSERT INTO post (author_id, title, body) VALUES ($1, $2, $3)', [
        user_id,
        title,
        body,
      ]);

      res.status(200).json('Successfully created post');
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Edit a post
router.put('/edit/:post_id', async (req, res) => {
  try {
    if (req.user) {
      const user_id = req.user.id;
      const { post_id } = req.params;
      const { title, body } = req.body;
      const post = await pool.query(
        'UPDATE post SET (title, body) = ($1, $2) WHERE id = $3 AND author_id = $4 RETURNING *',
        [title, body, post_id, user_id]
      );

      if (post.rowCount) {
        res.status(200).json('Successfully updated post');
      } else {
        res.status(401).json('Failed to update post');
      }
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Delete a post
router.delete('/delete/:post_id', async (req, res) => {
  try {
    if (req.user) {
      const user_id = req.user.id;
      const { post_id } = req.params;
      const post = await pool.query(
        'DELETE FROM post WHERE id = $1 AND author_id = $2 RETURNING *',
        [post_id, user_id]
      );

      if (post.rowCount) {
        res.status(200).json('Successfully deleted post');
      } else {
        res.status(401).json('Failed to delete post');
      }
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
