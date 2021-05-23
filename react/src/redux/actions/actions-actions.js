import { createAction } from '@reduxjs/toolkit';

// const addActionRequest = createAction('actions/addActionRequest');
const addActionSuccess = createAction('actions/addActionSuccess');
// const addActionError = createAction('actions/addActionError');

// constaddAllActionRequest = createAction('actions/addAllActionRequest');
const addAllActionsSuccess = createAction('actions/addAllActionsSuccess');
// const addAllActionError = createAction('actions/addAllActionError');

const actionsActions = {
  addActionSuccess,
  addAllActionsSuccess,
}

export default actionsActions;