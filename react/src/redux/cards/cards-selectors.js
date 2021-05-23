import { createSelector } from '@reduxjs/toolkit';

const getCurrentCardId = state => state.cards.currentCardId;

const getCardsOfBoard = state => state.cards.items;

const getLoading = state => state.cards.loading;

const getCurrentCard = createSelector([getCardsOfBoard, getCurrentCardId],
  (cards, cardId) => cards.find(({ id }) => id === cardId));
  
const cardsSelectors = {
  getCardsOfBoard,
  getCurrentCardId,
  getCurrentCard,
  getLoading,
};

export default cardsSelectors;