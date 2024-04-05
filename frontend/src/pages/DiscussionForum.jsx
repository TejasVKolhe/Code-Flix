import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentBox from "../components/CommentBox";
import { listComments, postComment } from "../store/actions/discussionActions";

const DiscussionForum = ()=> {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch comments from Redux store
  const commentList = useSelector((state) => state.commentList);
  const { comments } = commentList;
  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        await dispatch(listComments());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || "An error occurred while fetching comments.");
      }
    };

    fetchComments();
  }, [dispatch]);

  // Function to add new comment
  const addComment = (newComment) => {
    // Add new comment to the list of comments
    dispatch(postComment(newComment));
  };

  return (
    <div>
      <h1>Discussion Forum</h1>
      {/* Render CommentBox component */}
      <CommentBox addComment={addComment} />
      {/* Display previous comments */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : comments && comments.length > 0 ? (
        <div>
          {comments.map((comment, index) => (
            <div key={index}>
              <p style={{ color: "black" }}>{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No comments yet.</div>
      )}
    </div>
  );
}

export default DiscussionForum;
