import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import listsActions from './lists-actions';

const listsItemsReducer = createReducer([], {
  [listsActions.addAllListsSuccess]: (_, { payload }) => payload,
  [listsActions.addListSuccess]: (state, { payload }) => [...state, payload],
  [listsActions.editListSuccess]: (state, { payload }) => [...state.filter(({ id }) => id !== payload.id), payload],
  [listsActions.deleteListSuccess]: (state, { payload }) =>
    [{ ...state.find(({ id }) => id === payload), active: false },
      ...state.filter(({ id }) => id !== payload)],
})

const loading = createReducer(false, {
  [listsActions.addListRequest]: () => true,
  [listsActions.addListSuccess]: () => false,
  [listsActions.addListError]: () => false,

  [listsActions.editListRequest]: () => true,
  [listsActions.editListSuccess]: () => false,
  [listsActions.editListError]: () => false,

  [listsActions.deleteListRequest]: () => true,
  [listsActions.deleteListSuccess]: () => false,
  [listsActions.deleteListError]: () => false
})

const errorReducer = createReducer(null, {
  [listsActions.addListError]: (_, error) => error,
  [listsActions.editListError]: (_, error) => error,
  [listsActions.deleteListError]: (_, error) => error,
})

const currentListIdReducer = createReducer(null, {
  [listsActions.setCurrentListId]: (_, { payload }) => payload,
})

const listsReducer = combineReducers({
  items: listsItemsReducer,
  currentListId: currentListIdReducer,
  loading,
  error: errorReducer
})

export default listsReducer;