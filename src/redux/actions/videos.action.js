import request from '../../api';
import {
  HOME_VIDEOS_FAILED,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
} from '../actionTypes';

export const getMostPopularVideos = () => async dispatch => {
  try {
    dispatch({ type: HOME_VIDEOS_REQUEST });

    const res = await request.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'IN',
        maxResults: 20,
        pageToken: '',
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: res.data.items,
        nextPageToken: res.data.nextPageToken,
        category: 'All',
      },
    });

    console.log(res);
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAILED,
      payload: error.message,
    });
  }
};

export const getVideosByCategory = keyword => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: 'video',
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAILED,
      payload: error.message,
    });
  }
};
