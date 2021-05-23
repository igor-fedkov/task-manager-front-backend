import axios from 'axios';

import {
  boardsActions,
  listsActions,
  cardsActions,
  commentsActions,
  actionsActions,
  globalActions,
} from '../';

const getAllBoards = () => async dispatch => {

  dispatch(boardsActions.getBoardsRequest());

  try {
    const { data } = await axios.get('/boards');
    dispatch(boardsActions.getBoardsSuccess(data.boards));
  } catch(error) {
    dispatch(boardsActions.getBoardsError(error.message));
  }
};

// -------------------------------------------------------

const addBoard = (newAction, newBoard) => async dispatch => {

  dispatch(boardsActions.addBoardRequest());

  try {
    const { data: { board } } = await axios.post('/boards', { ...newBoard });
    newAction.objId = board.id;
    const { data: { action } } = await axios.post('/actions', newAction);

    dispatch(boardsActions.addBoardSuccess(board));
    dispatch(boardsActions.setCurrentBoardId(board.id));
    dispatch(actionsActions.addActionSuccess(action));
  } catch (error) {
    dispatch(boardsActions.getBoardsError(error.message));
  }
}

// -------------------------------------------------------

const getCurrentBoard = (boardId) => async dispatch => {

  dispatch(boardsActions.getCurrentBoardRequest());

  try {
    const { data } = await axios.get(`/boards/${boardId}`);
    dispatch(boardsActions.getCurrentBoardSuccess(data.board));
    dispatch(cardsActions.addAllCardsSuccess(data.cards));
    dispatch(commentsActions.addAllCommentsSuccess(data.comments));
    dispatch(actionsActions.addAllActionsSuccess(data.actions));
    dispatch(listsActions.addAllListsSuccess(data.lists));
  } catch (error) {
    dispatch(boardsActions.getCurrentBoardError(error.message));
    dispatch(globalActions.createNotificationText(error.response.data.message));
  }
}

// -------------------------------------------------------

const deleteBoard = ({ newAction, boardId }) => async dispatch => {

  dispatch(boardsActions.deleteBoardRequest());

  try {
    await axios.delete(`/boards/${boardId}`);
    const { data: { action } } = await axios.post('/actions', newAction);

    dispatch(boardsActions.deleteBoardSuccess(boardId))
    dispatch(boardsActions.setCurrentBoardId(null));
    dispatch(actionsActions.addActionSuccess(action));
  } catch (error) {
    dispatch(boardsActions.deleteBoardsError(error.message));
  }

}

const boardsOperations = {
  getAllBoards,
  getCurrentBoard,
  addBoard,
  deleteBoard,
}

export default boardsOperations