const express = require('express');
const router = express.Router();
const { getAllComments, createComment } = require('../controller/discussionController');

router.route('/getcomment', getAllComments);
router.route('/postcomment', createComment);

module.exports = router;
