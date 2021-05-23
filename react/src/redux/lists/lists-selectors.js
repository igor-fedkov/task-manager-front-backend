import { createSelector } from '@reduxjs/toolkit';

const getCurrentListId = state => state.lists.currentListId;

const getBoardLists = state => state.lists.items;

const getLoading = state => state.lists.loading;

const getBoardListsActive = createSelector([getBoardLists],
  (lists) => lists
    .filter(({ active }) => active)
    .sort((a, b) => a.title < b.title ? -1 : 1)
);

const getCurrentList = createSelector([getBoardLists, getCurrentListId],
  (lists, currentListId) => lists.find(({ id }) => id === currentListId));

const listsSelectors = {
  // getAllLists,
  getBoardLists,
  getBoardListsActive,
  getCurrentListId,
  getCurrentList,
  getLoading,
};

export default listsSelectors;