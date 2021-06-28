import {
  HOME_VIDEOS_FAILED,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
} from '../actionTypes';

const initialState = {
  videos: [],
  loading: null,
  nextPageToken: null,
};

export const homeVideosReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload.videos,
        nextPageToken: payload.nextPageToken,
      };
    case HOME_VIDEOS_FAILED:
      return { ...state, loading: false, error: payload };
    default:
      return { ...state };
  }
};
