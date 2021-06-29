import {
  CHANNEL_DETAILS_FAILED,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from '../actionTypes';

export const channelDetailsReducer = (
  state = {
    loading: true,
    channel: null,
    subscriptionStatus: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CHANNEL_DETAILS_SUCCESS:
      return { ...state, loading: false, channel: payload };
    case CHANNEL_DETAILS_FAILED:
      return { ...state, loading: false, error: payload };
    case SET_SUBSCRIPTION_STATUS:
      return { ...state, subscriptionStatus: payload };
    default:
      return state;
  }
};
