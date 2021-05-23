import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import cardsActions from './cards-actions';

const cardsListReducer = createReducer([], {
  [cardsActions.addAllCardsSuccess]: (_, { payload }) => payload,
  [cardsActions.addCardSuccess]: (state, { payload }) => [...state, payload],
  [cardsActions.editCardSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload.id), payload],
  [cardsActions.deleteCardSuccess]: (state, { payload }) =>
    [{ ...state.find(({ id }) => id === payload), active: false },
      ...state.filter(({ id }) => id !== payload)],
})

const loading = createReducer(false, {
  [cardsActions.addCardRequest]: () => true,
  [cardsActions.addCardSuccess]: () => false,
  [cardsActions.addCardError]: () => false,

  [cardsActions.editCardRequest]: () => true,
  [cardsActions.editCardSuccess]: () => false,
  [cardsActions.editCardError]: () => false,

  [cardsActions.deleteCardRequest]: () => true,
  [cardsActions.deleteCardSuccess]: () => false,
  [cardsActions.deleteCardError]: () => false
})

const errorReducer = createReducer(null, {
  [cardsActions.addCardError]: (_, error) => error,
  [cardsActions.editCardError]: (_, error) => error,
  [cardsActions.deleteCardError]: (_, error) => error,
})

const currentCardIdReducer = createReducer(null, {
  [cardsActions.setCurrentCardId]: (_, { payload }) => payload,
})

const cardsReducer = combineReducers({
  items: cardsListReducer,
  currentCardId: currentCardIdReducer,
  loading,
  error: errorReducer
})

export default cardsReducer;