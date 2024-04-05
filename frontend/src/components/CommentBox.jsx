import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { postComment } from '../store/actions/discussionActions';

function CommentBox({ addComment }) {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    dispatch(postComment(newComment));
    setNewComment(''); // Clear input field after posting comment
  } catch (error) {
    console.error('Error adding comment:', error);
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="4"
        cols="50"
        placeholder="Add your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        required
      ></textarea>
      <br />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentBox;
