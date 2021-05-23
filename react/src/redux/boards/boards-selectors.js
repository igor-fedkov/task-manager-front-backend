import { createSelector } from '@reduxjs/toolkit';

import { authSelectors } from '../';

const getAllBoards = state => state.boards.items;

const getCurrentBoardId = state => state.boards.currentBoardId;

const getCurrentBoard = state => state.boards.currentBoard;

const getLoading = state => state.boards.loading;

const getError = state => state.boards.error;

const getOwnBoards = createSelector([getAllBoards, authSelectors.getUser],
  (boards, user) => boards
    .filter(({ owner, active }) => owner === user.id && active)
    .sort((a, b) => a.title < b.title ? -1 : 1)
);

const getOtherBoards = createSelector([getAllBoards, authSelectors.getUser],
  (boards, user) => boards
    .filter(({ owner, active }) => owner !== user.id && active)
    .sort((a, b) => a.title < b.title ? -1 : 1)
);

const boardsSelectors = {
  getAllBoards,
  getCurrentBoardId,
  getCurrentBoard,
  getOwnBoards,
  getOtherBoards,
  getLoading,
  getError,
}

export default boardsSelectors;