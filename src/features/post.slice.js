import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  },
  reducers: {
    setPostData: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    editPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return { ...post, content: action.payload.content };
        } else {
          return post;
        }
      });
    },
    addComment: (state, action) => {
      state.posts.map((post) => {
        if (post.id === action.payload.id) {
          if (post.comments !== null) {
            post.comments.push({
              commentAuthor: action.payload.commentAuthor,
              content: action.payload.content,
            });
          } else {
            post.comments = [
              {
                commentAuthor: action.payload.commentAuthor,
                content: action.payload.content,
              },
            ];
          }
        }
      });
    },
  },
});

export default postSlice.reducer;
export const { setPostData, addPost, deletePost, addComment } =
  postSlice.actions;
