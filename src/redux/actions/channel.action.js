import request from '../../api';
import {
  CHANNEL_DETAILS_FAILED,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from '../actionTypes';

export const getChannelDetails = id => async dispatch => {
  try {
    dispatch({ type: CHANNEL_DETAILS_REQUEST });

    const { data } = await request.get('/channels', {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: id,
      },
    });

    dispatch({ type: CHANNEL_DETAILS_SUCCESS, payload: data.items[0] });
  } catch (error) {
    // console.log(error.response.data);
    dispatch({ type: CHANNEL_DETAILS_FAILED, payload: error.response.data });
  }
};

export const checkSubscriptionStatus = id => async (dispatch, getState) => {
  try {
    const { data } = await request.get('/subscriptions', {
      params: {
        part: 'snippet',
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({ type: SET_SUBSCRIPTION_STATUS, payload: data.items.length });
    // console.log(data);
  } catch (error) {
    console.log(error.response.data);
  }
};
