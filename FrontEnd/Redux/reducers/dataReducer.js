import {
  SET_POSTS,
  SET_POST,
  SET_USERS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  POST_ONE_POST,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  posts: [],
  post: {},
  users: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case SET_POST:
      return {
        ...state,
        post: action.payload
      };

    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      // check for getting singular post
      if (state.post.postId === action.payload.postId) {
        // if the state updates with new likeCount, we want the old state with all the comments, and add payload on top
        state.post = { ...state.post, ...action.payload };
      }
      return {
        ...state
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.postId !== action.payload)
      };

    case POST_ONE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };

    default:
      return state;
  }
}
