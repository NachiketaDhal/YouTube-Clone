import request from '../../api';
import {
  COMMENT_LIST_FAILED,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  CREATE_COMMENT_FAILED,
  CREATE_COMMENT_SUCCESS,
} from '../actionTypes';

export const getCommentsByVideoId = id => async dispatch => {
  try {
    dispatch({ type: COMMENT_LIST_REQUEST });

    const { data } = await request.get('/commentThreads', {
      params: {
        part: 'snippet',
        videoId: id,
      },
    });

    dispatch({ type: COMMENT_LIST_SUCCESS, payload: data.items });
    // console.log(data);
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: COMMENT_LIST_FAILED, payload: error.response.data });
  }
};

export const addComment = (id, text) => async (dispatch, getState) => {
  try {
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    await request.post('/commentThreads', obj, {
      params: {
        part: 'snippet',
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });

    setTimeout(() => dispatch(getCommentsByVideoId(id)), 3000);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: CREATE_COMMENT_FAILED,
      payload: error.response.data.message,
    });
  }
};
