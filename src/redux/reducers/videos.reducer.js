import {
  HOME_VIDEOS_FAILED,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEO_FAILED,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SELECTED_VIDEOS_FAILED,
  SELECTED_VIDEOS_REQUEST,
  SELECTED_VIDEOS_SUCCESS,
} from '../actionTypes';

const initialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: 'All',
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
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    case HOME_VIDEOS_FAILED:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case SELECTED_VIDEOS_SUCCESS:
      return { ...state, loading: false, video: payload };
    case SELECTED_VIDEOS_FAILED:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
export const relatedVideoReducer = (
  state = {
    loading: true,
    videos: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case RELATED_VIDEO_REQUEST:
      return { ...state, loading: true };
    case RELATED_VIDEO_SUCCESS:
      return { ...state, loading: false, videos: payload };
    case RELATED_VIDEO_FAILED:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
