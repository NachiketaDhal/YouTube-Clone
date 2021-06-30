import request from '../../api';
import {
  CHANNEL_VIDEOS_FAILED,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAILED,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEO_FAILED,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCH_VIDEO_FAILED,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_SUCCESS,
  SELECTED_VIDEOS_FAILED,
  SELECTED_VIDEOS_REQUEST,
  SELECTED_VIDEOS_SUCCESS,
  SUBSCRIPTION_CHANNEL_FAILED,
  SUBSCRIPTION_CHANNEL_REQUEST,
  SUBSCRIPTION_CHANNEL_SUCCESS,
} from '../actionTypes';

export const getMostPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: HOME_VIDEOS_REQUEST });

    const res = await request.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'IN',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
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

    // console.log(res);
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
    const { data } = await request.get('/search', {
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

export const getVideoById = id => async dispatch => {
  try {
    dispatch({ type: SELECTED_VIDEOS_REQUEST });

    const { data } = await request.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: id,
      },
    });

    dispatch({ type: SELECTED_VIDEOS_SUCCESS, payload: data.items[0] });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SELECTED_VIDEOS_FAILED, payload: error.message });
  }
};
export const getRelatedVideos = id => async dispatch => {
  try {
    dispatch({ type: RELATED_VIDEO_REQUEST });

    const { data } = await request.get('/search', {
      params: {
        part: 'snippet',
        relatedToVideoId: id,
        maxResults: 15,
        type: 'video',
      },
    });

    dispatch({ type: RELATED_VIDEO_SUCCESS, payload: data.items });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: RELATED_VIDEO_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getVideosBySearch = keyword => async dispatch => {
  try {
    dispatch({
      type: SEARCH_VIDEO_REQUEST,
    });
    const { data } = await request.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: keyword,
        type: 'video,channel',
      },
    });

    dispatch({
      type: SEARCH_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCH_VIDEO_FAILED,
      payload: error.message,
    });
  }
};

export const getSubscriptionChannel = id => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBSCRIPTION_CHANNEL_REQUEST });
    const { data } = await request.get('/subscriptions', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: SUBSCRIPTION_CHANNEL_SUCCESS,
      payload: data.items,
    });
    // console.log(data);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: SUBSCRIPTION_CHANNEL_FAILED,
      payload: error.response.data,
    });
  }
};

export const getVideosByChannelId = id => async dispatch => {
  try {
    dispatch({ type: CHANNEL_VIDEOS_REQUEST });

    // 1. Get upload playlist id
    const {
      data: { items },
    } = await request.get('/channels', {
      params: {
        part: 'contentDetails',
        id: id,
      },
    });

    const uploadPlaylistId =
      items[0]?.contentDetails?.relatedPlaylists?.uploads;
    // console.log(items);

    // 2. Get the videos using id
    const { data } = await request.get('/playlistItems', {
      params: {
        part: 'contentDetails,snippet',
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: data.items,
    });
    // console.log(data);
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: CHANNEL_VIDEOS_FAILED,
      payload: error.response.data.message,
    });
  }
};
