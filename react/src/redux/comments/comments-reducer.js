import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import commentActions from './comments-actions';

const commentsListReducer = createReducer([], {
  [commentActions.addAllCommentsSuccess]: (_, { payload }) => payload,
  [commentActions.addCommentSuccess]: (state, { payload }) => [...state, payload],
});

const loading = createReducer(false, {
  [commentActions.addCommentRequest]: () => true,
  [commentActions.addCommentSuccess]: () => false,
  [commentActions.addCommentError]: () => false,
});

const errorReducer = createReducer(null, {
  [commentActions.addCommentError]: (_, error) => error,
})

const commentsReducer = combineReducers({
  items: commentsListReducer,
  loading,
  error: errorReducer
})

export default commentsReducer