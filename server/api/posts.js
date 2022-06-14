const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../utils/authMiddleware');

// Get total number of posts
router.head('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*)::int FROM post');
    res.set('Total-Count', result.rows[0].count).send();
  } catch (error) {
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

// Create comment for post
router.post('/:post_id/comments', async (req, res) => {
  const author_id = req.user ? req.user.id : null;
  const { post_id } = req.params;
  const { body } = req.body;
  try {
    const response = await pool.query(
      'INSERT INTO comment (post_id, author_id, body) VALUES ($1, $2, $3) RETURNING id',
      [post_id, author_id, body]
    );
    res.status(201).json({ comment_id: response.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// Get comments for post
router.get('/:post_id/comments', async (req, res) => {
  const { post_id } = req.params;
  const limit = req.query.limit ? req.query.limit : 25;
  const offset = req.query.offset ? req.query.offset : 0;

  try {
    const comments = await pool.query(
      `SELECT comment.id, blog_user.username as author, comment.body, comment.created_on
      FROM comment
      LEFT JOIN blog_user ON comment.author_id = blog_user.id
      WHERE comment.post_id = $1
      ORDER BY created_on DESC
      OFFSET $2 ROWS
      FETCH FIRST $3 ROW ONLY`,
      [post_id, offset, limit]
    );

    res.status(200).json(comments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// Get total comment count for post
router.get('/:post_id/comments/count', async (req, res) => {
  const { post_id } = req.params;
  try {
    const response = await pool.query(`SELECT COUNT(*)::int FROM comment WHERE post_id = $1`, [
      post_id,
    ]);

    res.status(200).json(response.rows[0].count);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
