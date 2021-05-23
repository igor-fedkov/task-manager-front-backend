import { createAction } from '@reduxjs/toolkit';

// const addAlllistsRequest = createAction('lists/addAlllistsRequest');
const addAllListsSuccess = createAction('lists/addAllListsSuccess');
// const addAllListsError = createAction('lists/addAllListsError');

const addListRequest = createAction('lists/addlistRequest');
const addListSuccess = createAction('lists/addListSuccess');
const addListError = createAction('lists/addListError');

const getCurrentBoardListsRequest = createAction('lists/getCurrentBoardListsRequest');
const getCurrentBoardListsSuccess = createAction('lists/getCurrentBoardListsSuccess');
const getCurrentBoardListsError = createAction('lists/getCurrentBoardListsError');

const editListRequest = createAction('lists/editListRequest');
const editListSuccess = createAction('lists/editListSuccess');
const editListError = createAction('lists/editListError');

const deleteListRequest = createAction('lists/deleteListRequest');
const deleteListSuccess = createAction('lists/deleteListSuccess');
const deleteListError = createAction('lists/deleteListError');

const setCurrentListId = createAction('lists/setCurrentListId');

const listsActions = {
  addAllListsSuccess,
  addListRequest,
  addListSuccess,
  addListError,
  getCurrentBoardListsRequest,
  getCurrentBoardListsSuccess,
  getCurrentBoardListsError,
  editListRequest,
  editListSuccess,
  editListError,
  deleteListRequest,
  deleteListSuccess,
  deleteListError,
  setCurrentListId,
}

export default listsActions;