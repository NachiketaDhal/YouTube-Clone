import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  getCommentsByVideoId,
} from '../../redux/actions/comments.action';
import Comment from '../comment/Comment';
import './_comments.scss';

const Comments = ({ videoId, totalComments }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleComment = e => {
    e.preventDefault();
    if (inputValue.length > 0) {
      dispatch(addComment(videoId, inputValue));
    } else return;

    setInputValue('');
  };

  const { comments } = useSelector(state => state.commentList);
  const _comments = comments?.map(
    comment => comment.snippet.topLevelComment.snippet
  );

  const photoURL = useSelector(state => state?.auth?.user?.photoURL);

  useEffect(() => {
    dispatch(getCommentsByVideoId(videoId));
  }, [dispatch, videoId]);

  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img src={photoURL} alt="user" className="rounded-circle me-3" />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
