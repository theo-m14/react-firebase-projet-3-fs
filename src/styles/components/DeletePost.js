import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase.config";

const DeletePost = ({ postId }) => {
  const handleDelete = () => {
    deleteDoc(doc(db, "posts", postId));
  };

  return (
    <span className="delete" onClick={() => handleDelete()}>
      <i className="fa-solid fa-trash-can"></i>
    </span>
  );
};
export default DeletePost;
