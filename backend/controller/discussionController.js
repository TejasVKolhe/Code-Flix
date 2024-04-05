const asyncHandler = require("express-async-handler");
const Comment = require("../model/discussionSchema");

// Get all comments
// GET /api/comments
// Public

const getAllComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find();
    console.log("hi");
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new comment
// POST /api/comments
// Public

const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  try {
    const comment = await Comment.create({ text });
    res.status(201).json({
      msg: "New Comment Created",
      comment: comment // Optionally, you can also send the created comment data in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create comment' });
  }
});

module.exports = { getAllComments, createComment };
