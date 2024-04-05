import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentBox from "../components/CommentBox";
import { listComments, postComment } from "../store/actions/discussionActions";

const DiscussionForum = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch comments from Redux store
  const comments = useSelector((state) => state.commentList.comments); // More concise access

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        await dispatch(listComments());
      } catch (error) {
        setError(error.message || "An error occurred while fetching comments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [dispatch]);

  // Function to add a new comment
  const handleAddComment = (newComment) => {
    // Consider adding validation checks here (optional)
    dispatch(postComment(newComment));
  };

  return (
    <div className="discussion-forum" style={{ margin: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h1 className="forum-title" style={{ margin: "1rem 0", textAlign: "center", fontSize: "1.5rem" }}>
        Discussion Forum
      </h1>

      {/* Center the CommentBox component */}
      <div className="comment-box-container" style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <CommentBox onAddComment={handleAddComment} />
      </div>

      {/* Display previous comments */}
      <div className="comments-section">
        {isLoading ? (
          <div className="loading-message" style={{ textAlign: "center", padding: "1rem" }}>
            Loading Comments...
          </div>
        ) : error ? (
          <div className="error-message" style={{ textAlign: "center", padding: "1rem", color: "red" }}>
            Error: {error}
          </div>
        ) : comments && comments.length > 0 ? (
          <div>
            <h2 className="comments-heading" style={{ margin: "1rem 0", textAlign: "center" }}>
              Previous Comments:
            </h2>
            <ul className="comment-list" style={{backgroundColor:'lightGrey'}}>
              {comments.map((comment, index) => (
                <li
                  key={index}
                  className="comment-item"
                  style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
                >
                  <p className="comment-text" style={{ margin: 0, color: "black" }}>
                    {comment.text}
                  </p>
                  <p className="comment-metadata" style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                    Posted by: {comment.name} at {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-comments-message" style={{ textAlign: "center", padding: "1rem" }}>
            No comments yet. Be the first to start the discussion!
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionForum;
