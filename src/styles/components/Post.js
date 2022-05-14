import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../utils/firebase.config";
import CommentPost from "./CommentPost";
import DeletePost from "./DeletePost";

const Post = ({ post, user }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editMess, setEditMess] = useState(null);

  const dateFormater = (date) => {
    let newDate = Math.floor((new Date() - new Date(date)) / (1000 * 60));
    let timeType = "minute" + (newDate > 1 ? "s" : "");
    if (newDate > 60) {
      newDate = Math.floor(newDate / 60);
      timeType = "heure" + (newDate > 1 ? "s" : "");
      if (newDate > 24) {
        newDate = Math.floor(newDate / 24);
        timeType = "jour" + (newDate > 1 ? "s" : "");
      }
    }
    return newDate + " " + timeType;
  };

  const handleEdit = () => {
    setToggleEdit(false);

    if (editMess) {
      updateDoc(doc(db, "posts", post.id), { content: editMess });
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="left-part">
          <div className="title">
            <span>{post.author[0]}</span>
            <h2>{post.author}</h2>
          </div>
          <h5>Posté il y a {dateFormater(post.date)}</h5>
        </div>
        <div className="right-part">
          {user && user.uid === post.userUid && (
            <>
              <span onClick={() => setToggleEdit(!toggleEdit)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </span>
              <DeletePost postId={post.id} />
            </>
          )}
        </div>
      </div>
      {!toggleEdit ? (
        <p>{editMess ? editMess : post.content}</p>
      ) : (
        <>
          <textarea
            defaultValue={editMess ? editMess : post.content}
            autoFocus
            onChange={(e) => setEditMess(e.target.value)}
          ></textarea>
          <button className="edit-btn" onClick={() => handleEdit()}>
            Modifier
          </button>
        </>
      )}
      <CommentPost post={post} user={user} />
    </div>
  );
};

export default Post;
