import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../features/post.slice";
import { db } from "../../utils/firebase.config";
import CommentCard from "./CommentCard";

const CommentPost = ({ post, user }) => {
  const commentMessage = useRef();
  const dispatch = useDispatch();

  const handleSendComment = (e) => {
    e.preventDefault();

    let messageData = [];

    if (post.comments !== null) {
      messageData = [
        ...post.comments,
        {
          commentAuthor: user.displayName,
          content: commentMessage.current.value,
        },
      ];
    } else {
      messageData = [
        {
          commentAuthor: user.displayName,
          content: commentMessage.current.value,
        },
      ];
    }
    try {
      updateDoc(doc(db, "posts", post.id), {
        comments: messageData,
      })
        .then(() => {
          dispatch(
            addComment({
              commentAuthor: user.displayName,
              content: commentMessage.current.value,
              id: post.id,
            })
          );
        })
        .then(() => {
          commentMessage.current.value = "";
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="comment-container">
      <h5 className="comment-title">Commentaires</h5>
      {post.comments &&
        post.comments.map((comment, index) => (
          <CommentCard comment={comment} key={index} />
        ))}
      {user ? (
        <form onSubmit={(e) => handleSendComment(e)}>
          <textarea
            placeholder="Ecrivez un commentaire"
            ref={commentMessage}
          ></textarea>
          <input type="submit" value="Envoyer" />
        </form>
      ) : (
        <p>Vous devez être connectés pour écrire un commentaire</p>
      )}
    </div>
  );
};

export default CommentPost;
