import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { auth, db } from "../../utils/firebase.config";
import CommentCard from "./CommentCard";

const CommentPost = ({ post }) => {
  const [user, setUser] = useState(null);
  const commentMessage = useRef();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
      console.log(messageData);
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
      });
      commentMessage.current.value = "";
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
