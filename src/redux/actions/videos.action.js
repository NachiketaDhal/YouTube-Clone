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
