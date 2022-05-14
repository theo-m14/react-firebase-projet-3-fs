import { useEffect, useState } from "react";
import ConnectModal from "./styles/components/ConnectModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./utils/firebase.config";
import CreatePost from "./styles/components/CreatePost";
import { collection, getDocs } from "firebase/firestore";
import Post from "./styles/components/Post";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "./features/post.slice";

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    getDocs(collection(db, "posts")).then((res) =>
      dispatch(
        setPostData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
    );
  }, [user, posts]);

  return (
    <div>
      <div className="app-header">
        {user && (
          <div className="user-infos">
            <span>{user?.displayName[0]}</span>
            <h4>{user?.displayName}</h4>
            <button onClick={() => handleLogout()}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        )}
        {user ? (
          <CreatePost userUid={user.uid} userDisplayName={user.displayName} />
        ) : (
          <ConnectModal />
        )}
      </div>
      <div className="posts-container">
        {posts &&
          [...posts]
            .sort((a, b) => b.date - a.date)
            .map((post) => <Post post={post} key={post.id} user={user} />)}
      </div>
    </div>
  );
}

export default App;
