import axios from 'axios';

import { cardsActions, actionsActions } from '../';

const addCard = (newAction, newCard) => async dispatch => {
  
  dispatch(cardsActions.addCardRequest());

  try {
    const { data: { card } } = await axios.post('/cards', { ...newCard });
    newAction.objId = card.id;
    const { data: { action } } = await axios.post('/actions', newAction);

    dispatch(cardsActions.addCardSuccess(card))
    dispatch(actionsActions.addActionSuccess(action));
  } catch (error) {
    dispatch(cardsActions.addCardError(error.message));
  }
};

// -------------------------------------------------------

const moveCard = ({ newAction, cardId, listId }) => async dispatch => {
  dispatch(cardsActions.editCardRequest());

  try {
    const { data: { action } } = await axios.post('/actions', newAction);
    const { data: { card } } = await axios.patch(`/cards/${cardId}`, { listId });

    dispatch(actionsActions.addActionSuccess(action));
    dispatch(cardsActions.editCardSuccess(card))
  } catch (error) {
    dispatch(cardsActions.editCardError(error.message));
  }
};

// -------------------------------------------------------

const addDescription = ({ newAction, cardId, description }) => async dispatch => {
  dispatch(cardsActions.editCardRequest());

  try {
    const { data: { action } } = await axios.post('/actions', newAction);
    const { data: { card } } = await axios.patch(`/cards/${cardId}/description`, { description });

    dispatch(actionsActions.addActionSuccess(action));
    dispatch(cardsActions.editCardSuccess(card))
  } catch (error) {
    dispatch(cardsActions.editCardError(error.message));
  }
}

// -------------------------------------------------------

const deleteCard = ({ newAction, cardId }) => async dispatch => {
  dispatch(cardsActions.deleteCardRequest());

  try {
    const { data: { action } } = await axios.post('/actions', newAction);
    await axios.delete(`/cards/${cardId}`);

    dispatch(actionsActions.addActionSuccess(action));
    dispatch(cardsActions.deleteCardSuccess(cardId))
  } catch (error) {
    dispatch(cardsActions.deleteCardError(error.message));
  }
};

const cardsOperations = {
  addCard,
  addDescription,
  moveCard,
  deleteCard,
}

export default cardsOperations;

