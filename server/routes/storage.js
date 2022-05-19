const s3 = require('../utils/s3');
const express = require('express');
const router = express.Router();

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json('Unauthenticated.');
  }
}

// Get S3 bucket upload link
router.get('/uploadUrl', checkAuthenticated, async (req, res) => {
  try {
    const url = await s3.generateUploadURL();
    res.status(200).json(url);
  } catch (error) {
    console.error(error);
  }
});

// Delete object from S3 bucket
router.delete('/:objectKey', checkAuthenticated, async (req, res) => {
  try {
    const key = req.params.objectKey;
    await s3.deleteObject(key);
    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
