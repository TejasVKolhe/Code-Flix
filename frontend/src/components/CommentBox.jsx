import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../store/actions/discussionActions';

function CommentBox({ addComment }) {
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState(''); // State for storing the name
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(postComment(newComment, name)); // Passing the name to postComment action
      setNewComment('');
      setName(''); // Clearing the name input after submitting the comment
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
      <textarea
        style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', resize: 'none' }}
        rows="4"
        cols="50"
        placeholder="Add your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        required
      />
      <br />
      <input
        style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', width: '100%', marginBottom: '1rem' }}
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <button type="submit" style={{ padding: '1rem 2rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Add Comment
      </button>
    </form>
  );
}

export default CommentBox;
