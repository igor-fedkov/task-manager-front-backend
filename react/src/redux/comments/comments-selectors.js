import { createSelector } from '@reduxjs/toolkit';

import { cardsSelectors } from '../';

const getAllComments = state => state.comments.items;

const getLoading = state => state.comments.loading;

const getCommentsCurrentCard = createSelector([
  getAllComments,
  cardsSelectors.getCurrentCardId],
  (comments, id) => comments.filter(({ cardId }) => cardId === id)
);

const commentsSelectors = {
  getAllComments,
  getCommentsCurrentCard,
  getLoading,
}

export default commentsSelectors;