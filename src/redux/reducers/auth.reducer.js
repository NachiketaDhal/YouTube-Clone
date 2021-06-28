import {
  LOAD_PROFILE,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actionTypes';

const initialState = {
  accessToken: sessionStorage.getItem('ytc-accessToken')
    ? sessionStorage.getItem('ytc-accessToken')
    : null,
  user: sessionStorage.getItem('ytc-user')
    ? JSON.parse(sessionStorage.getItem('ytc-user'))
    : null,
  loading: null,
};

export const authReducer = (prevState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return { ...prevState, loading: true };
    case LOGIN_SUCCESS:
      return { ...prevState, accessToken: payload, loading: false };
    case LOGIN_FAILED:
      return {
        ...prevState,
        accessToken: null,
        loading: false,
        error: payload,
      };
    case LOAD_PROFILE:
      return { ...prevState, user: payload };
    case LOGOUT:
      return { ...prevState, accessToken: null, user: null };
    default:
      return prevState;
  }
};
