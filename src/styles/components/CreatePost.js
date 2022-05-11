import { useRef } from "react";
import { db } from "../../utils/firebase.config";
import { addDoc, collection } from "firebase/firestore";

const CreatePost = ({ userDisplayName, userUid }) => {
  const postMessage = useRef();
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const post = {
      userUid,
      author: userDisplayName,
      content: postMessage.current.value,
      comments: null,
      date: Date.now(),
    };
    try {
      await addDoc(collection(db, "posts"), post);
      postMessage.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="new-post-modal">
      <form onSubmit={(e) => handleCreatePost(e)}>
        <textarea placeholder="Message..." ref={postMessage}></textarea>
        <input type="submit" value="Poster" />
      </form>
    </div>
  );
};

export default CreatePost;
