const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../utils/authMiddleware');

// Get total number of posts
router.head('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT count(*) FROM post');
    //res.status(200).json(result.rows[0].count);
    res.set('Total-Count', result.rows[0].count).send();
  } catch (error) {
    console.log('in here!!');
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Get posts
router.get('/', async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const posts = await pool.query(
      `SELECT post.id, post.title, post.body, post.created_on, blog_user.username as author
      FROM post
      INNER JOIN blog_user
      ON post.author_id = blog_user.id ORDER BY created_on DESC
      OFFSET $1 ROWS
      FETCH FIRST $2 ROW ONLY`,
      [offset, limit ? limit : 10]
    );
    res.status(200).json(posts.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Get post by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await pool.query(
      `SELECT post.id, post.title, post.body, post.created_on, blog_user.username as author
      FROM post
      INNER JOIN blog_user
      ON post.author_id = blog_user.id
      WHERE post.id = $1`,
      [id]
    );
    res.status(200).json(posts.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Create a post
router.post('/', authMiddleware.checkAuthenticated, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, body } = req.body;
    await pool.query('INSERT INTO post (author_id, title, body) VALUES ($1, $2, $3)', [
      user_id,
      title,
      body,
    ]);
    res.status(200).json('Successfully created post');
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Edit a post
router.put('/:post_id', authMiddleware.checkAuthenticated, async (req, res) => {
  try {
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
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Delete a post
router.delete('/:post_id', authMiddleware.checkAuthenticated, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { post_id } = req.params;
    const post = await pool.query(
      'DELETE FROM post WHERE id = $1 AND author_id = $2 RETURNING *',
      [post_id, user_id]
    );

    if (post.rowCount) {
      res.status(200).json('Successfully deleted post');
    } else {
      res.status(403).json('Unauthorized');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
