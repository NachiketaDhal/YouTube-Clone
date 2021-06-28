import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/auth.action';

import './_loginScreen.scss';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  const accessToken = useSelector(state => state.auth.accessToken);
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push('/');
    }
  }, [accessToken, history]);

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="youtube"
        />
        <button onClick={handleLogin}>Login with Google</button>
        <p>A Youtube clone project made with React.js</p>
      </div>
    </div>
  );
};

export default LoginScreen;
