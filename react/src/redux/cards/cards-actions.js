import { createAction } from '@reduxjs/toolkit';

// const addAllCardsRequest = createAction('cards/addAllCardsRequest');
const addAllCardsSuccess = createAction('cards/addAllCardsSuccess');
// const addAllCardsError = createAction('cards/addAllCardsError');

const addCardRequest = createAction('cards/addCardRequest');
const addCardSuccess = createAction('cards/addCardSuccess');
const addCardError = createAction('cards/addCardError');

const editCardRequest = createAction('cards/editCardRequest');
const editCardSuccess = createAction('cards/editCardSuccess');
const editCardError = createAction('cards/editCardError');

const deleteCardRequest = createAction('cards/deleteCardRequest');
const deleteCardSuccess = createAction('cards/deleteCardSuccess');
const deleteCardError = createAction('cards/deleteCardError');

const setCurrentCardId = createAction('cards/setCurrentCardId');

const cardsActions = {
  addAllCardsSuccess,
  addCardRequest,
  addCardSuccess,
  addCardError,
  editCardRequest,
  editCardSuccess,
  editCardError,
  deleteCardRequest,
  deleteCardSuccess,
  deleteCardError,
  setCurrentCardId,
}

export default cardsActions;