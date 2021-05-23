import { createAction } from '@reduxjs/toolkit';

// const addAllCommentsRequest = createAction('comments/addAllCommentsRequest');
const addAllCommentsSuccess = createAction('comments/addAllCommentsSuccess');
// const addAllCommentsError = createAction('comments/addAllCommentsError');

const addCommentRequest = createAction('comments/addCommentRequest');
const addCommentSuccess = createAction('comments/addCommentSuccess');
const addCommentError = createAction('comments/addCommentError');

const commentsActions = {
  addAllCommentsSuccess,
  addCommentRequest,
  addCommentSuccess,
  addCommentError,
}

export default commentsActions;