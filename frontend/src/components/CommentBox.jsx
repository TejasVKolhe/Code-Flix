import React, { useState } from 'react';
import axios from 'axios';

function CommentBox({ addComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/comments", { text: newComment });
      addComment(response.data);
      setNewComment('');
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
