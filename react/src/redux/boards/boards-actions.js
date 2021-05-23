import { createAction } from '@reduxjs/toolkit';

const getBoardsRequest = createAction('boards/getBoardsRequest');
const getBoardsSuccess = createAction('boards/getBoardsSuccess');
const getBoardsError = createAction('boards/getBoardsError');

const addBoardRequest = createAction('boards/addBoardRequest');
const addBoardSuccess = createAction('boards/addBoardSuccess');
const addBoardError = createAction('boards/addBoardError');

const deleteBoardRequest = createAction('boards/deleteBoardRequest');
const deleteBoardSuccess = createAction('boards/deleteBoardSuccess');
const deleteBoardError = createAction('boards/deleteBoardError');

const getCurrentBoardRequest = createAction('boards/getCurrentBoardRequest');
const getCurrentBoardSuccess = createAction('boards/getCurrentBoardSuccess');
const getCurrentBoardError = createAction('boards/getCurrentBoardError');

const setCurrentBoardId = createAction('boards/setCurrentBoardId');

const boardsActions = {
  getBoardsRequest,
  getBoardsSuccess,
  getBoardsError,
  addBoardRequest,
  addBoardSuccess,
  addBoardError,
  deleteBoardRequest,
  deleteBoardSuccess,
  deleteBoardError,
  getCurrentBoardRequest,
  getCurrentBoardSuccess,
  getCurrentBoardError,
  setCurrentBoardId,
}

export default boardsActions;