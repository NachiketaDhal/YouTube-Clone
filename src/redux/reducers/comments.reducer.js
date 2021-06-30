import {
  COMMENT_LIST_FAILED,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
} from '../actionTypes';

export const commentListReducer = (
  state = { loading: true, comments: null },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case COMMENT_LIST_REQUEST:
      return { ...state, loading: true };
    case COMMENT_LIST_SUCCESS:
      return { ...state, loading: false, comments: payload };
    case COMMENT_LIST_FAILED:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
