import auth from '../../firebase';
import firebase from 'firebase/app';
import {
  LOAD_PROFILE,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actionTypes';

export const login = () => async dispatch => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider);

    console.log(res);

    const accessToken = res.credential.accessToken;
    const profile = {
      name: res.additionalUserInfo.profile.name,
      photoURL: res.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem('ytc-accessToken', accessToken);
    sessionStorage.setItem('ytc-user', JSON.stringify(profile));

    dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
    dispatch({ type: LOAD_PROFILE, payload: profile });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: LOGIN_FAILED, payload: error.message });
  }
};

export const logout = () => async dispatch => {
  await auth.signOut();

  dispatch({ type: LOGOUT });
  sessionStorage.removeItem('ytc-accessToken');
  sessionStorage.removeItem('ytc-user');
};
