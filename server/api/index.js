const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/comments', require('./comments'));
router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
router.use('/storage', require('./storage'));

module.exports = router;
