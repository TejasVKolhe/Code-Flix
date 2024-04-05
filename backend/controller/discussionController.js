const asyncHandler = require("express-async-handler");
const Comment = require("../model/discussionSchema");

// Get all comments
// GET /api/comments
// Public

const getAllComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }); // Sort comments by creation date
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
 
// Create a new comment
// POST /api/comments
// Public

// discussionController.js

const createComment = asyncHandler(async (req, res) => {
  const { text, user } = req.body; // Extract user's name from request body
  try {
    const createdAt = new Date(); // Get the current date and time
    const comment = await Comment.create({ text, user, createdAt }); // Include createdAt field when creating comment
    res.status(201).json({
      msg: "New Comment Created",
      comment: comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create comment' });
  }
});


module.exports = { getAllComments, createComment };
