import axios from "axios";
import {
  SET_POSTS,
  LOADING_DATA,
  LOADING_UI,
  STOP_LOADING_UI,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  POST_ONE_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_POST,
  SET_USERS,
  SUBMIT_COMMENT
} from "../types";

// Get all Posts
export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then(res => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

// Get one Post
export const getPost = postId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then(res => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Get UserData
export const getUserPageData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts
      });
    })
    .catch(() => {
      dispatch({ type: SET_POSTS, payload: null });
    });
};

// Get AllUsers
export const getAllCurrentUsers = () => dispatch => {
  axios
    .get("/users")
    .then(res => {
      dispatch({
        type: SET_USERS,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({ type: SET_USERS, payload: null });
    });
};

// Post
export const postOnePost = newPost => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/post", newPost)
    .then(res => {
      dispatch({
        type: POST_ONE_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// Comment
export const submitComment = (postId, commentData) => dispatch => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then(res => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Like
export const likePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/like`)
    .then(res => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch(err => console.log(err));
};

// Unlike
export const unlikePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch(err => console.log(err));
};

// Delete
export const deletePost = postId => dispatch => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(err => console.log(err));
};

// Clear
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
