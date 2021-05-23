import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authActions from './auth-actions';

const inicialUserState = { name: null, email: null };

const user = createReducer(inicialUserState, {
  [authActions.loginSuccess]: (_, { payload }) => payload.user,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload.user,
  [authActions.logoutSuccess]: () => inicialUserState,
})

const isAuthenticated = createReducer(false, {
  [authActions.loginSuccess]: () => true,
  [authActions.getCurrentUserSuccess]: () => true,
  
  [authActions.logoutSuccess]: () => false,
  [authActions.loginError]: () => false,
  [authActions.logoutError]: () => false,
  [authActions.getCurrentUserError]: () => false,
})

const token = createReducer(null, {
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutSuccess]: () => null,
  [authActions.getCurrentUserError]: () => null,
})

const error = createReducer(null, {
  [authActions.loginError]: (_, error) => error,
  [authActions.logoutError]: (_, error) => error,
  [authActions.getCurrentUserError]: (_, error) => error,
})

const authReducer = combineReducers({
  user,
  isAuthenticated,
  token,
  error,
})


export default authReducer;