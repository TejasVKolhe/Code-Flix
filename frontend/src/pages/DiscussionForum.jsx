import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentBox from '../components/CommentBox';
import { listComments } from '../store/actions/discussionActions';

function DiscussionForum() {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const commentList = useSelector((state) => state.commentList);

  useEffect(() => {
    dispatch(listComments());
  }, [dispatch]);

  const fetchedComments = useMemo(() => commentList ? commentList.comments : [], [commentList]);

  useEffect(() => {
    if (fetchedComments) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <h1>Discussion Forum</h1>
      <CommentBox addComment={addComment} />
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscussionForum;
