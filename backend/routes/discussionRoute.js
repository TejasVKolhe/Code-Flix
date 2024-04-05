const express = require('express');
const router = express.Router();
const { getAllComments, createComment } = require('../controller/discussionController');

router.get('/getcomment', getAllComments);
router.post('/postcomment', createComment);

module.exports = router;
