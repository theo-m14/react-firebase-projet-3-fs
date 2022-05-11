import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-post">
      <h5>{comment.commentAuthor}</h5>
      <p>{comment.content}</p>
    </div>
  );
};

export default CommentCard;
