import axios from 'axios';

import { actionsActions, commentsActions } from '../';

const addComment = (newAction, newComment) => async dispatch => {
  dispatch(commentsActions.addCommentRequest());

  try {
    const { data: { comment } } = await axios.post('/comments', { ...newComment });
    newAction.objId = comment.id;
    const { data: { action } } = await axios.post('/actions', newAction);

    dispatch(commentsActions.addCommentSuccess(comment))
    dispatch(actionsActions.addActionSuccess(action));
  } catch (error) {
    dispatch(commentsActions.addCommentError(error.message));
  }
};

const commentsOperations = {
  addComment,
}

export default commentsOperations;