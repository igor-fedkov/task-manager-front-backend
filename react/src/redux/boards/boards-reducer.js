import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import boardsActions from './boards-actions';

const boardsListReducer = createReducer([], {
  [boardsActions.getBoardsSuccess]: (_, { payload }) => payload,
  [boardsActions.addBoardSuccess]: (state, { payload }) => [...state, payload],
  [boardsActions.deleteBoardSuccess]: (state, { payload }) =>
    [{ ...state.find(({ id }) => id === payload), active: false },
      ...state.filter(({ id }) => id !== payload)],
})

const loading = createReducer(false, {
  [boardsActions.getBoardsRequest]: () => true,
  [boardsActions.getBoardsSuccess]: () => false,
  [boardsActions.getBoardsError]: () => false,

  [boardsActions.addBoardRequest]: () => true,
  [boardsActions.addBoardSuccess]: () => false,
  [boardsActions.addBoardError]: () => false,

  [boardsActions.getCurrentBoardRequest]: () => true,
  [boardsActions.getCurrentBoardSuccess]: () => false,
  [boardsActions.getCurrentBoardError]: () => false,

  [boardsActions.deleteBoardRequest]: () => true,
  [boardsActions.deleteBoardSuccess]: () => false,
  [boardsActions.deleteBoardError]: () => false,
})

const errorReducer = createReducer(null, {
  [boardsActions.getContactsError]: (_, error) => error,
  [boardsActions.addBoardError]: (_, error) => error,
  [boardsActions.deleteBoardError]: (_, error) => error,
  [boardsActions.getCurrentBoardError]: (_, error) => error,
})

const currentBoardIdReducer = createReducer(null, {
  [boardsActions.setCurrentBoardId]: (_, { payload }) => payload,
})

const currentBoardReducer = createReducer(null, {
  [boardsActions.getCurrentBoardSuccess]: (_, { payload }) => payload,
  [boardsActions.getCurrentBoardError]: () => null,
})

const boardsReducer = combineReducers({
  items: boardsListReducer,
  currentBoardId: currentBoardIdReducer,
  currentBoard: currentBoardReducer,
  loading,
  error: errorReducer
})

export default boardsReducer;