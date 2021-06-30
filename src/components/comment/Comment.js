import React from 'react';
import moment from 'moment';
import './_comment.scss';
const Comment = ({ comment }) => {
  return (
    <div className="comment p-2 d-flex">
      <img
        src={comment?.authorProfileImageUrl}
        alt=""
        className="rounded-circle me-3"
      />
      <div className="comment__body">
        <p className="comment__header mb-1">
          {comment?.authorDisplayName} •{' '}
          {moment(comment?.publishedAt).fromNow()}
        </p>
        <p className="mb-0">{comment?.textOriginal}</p>
      </div>
    </div>
  );
};

export default Comment;
