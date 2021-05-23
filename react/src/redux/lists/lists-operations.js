import axios from 'axios';

import { listsActions, actionsActions } from '../';

const addList = ({ newAction, newList }) => async dispatch => {

  dispatch(listsActions.addListRequest());

  try {
    const { data: { list } } = await axios.post('/lists', { ...newList });
    dispatch(listsActions.addListSuccess(list))
    newAction.objId = list.id;
    const { data: { action } } = await axios.post('/actions', newAction);
    dispatch(actionsActions.addActionSuccess(action));

  } catch (error) {
    dispatch(listsActions.addListError(error.message));
  }
}

// -------------------------------------------------------

const renameList = ({ newAction, listId, title }) => async dispatch => {

  dispatch(listsActions.editListRequest());

  try {
    const { data: { action } } = await axios.post('/actions', newAction);
    const { data: { list } } = await axios.patch(`/lists/${listId}`, { title });

    dispatch(actionsActions.addActionSuccess(action));
    dispatch(listsActions.editListSuccess(list))
  } catch (error) {
    dispatch(listsActions.editListError(error.message));
  }
}

// -------------------------------------------------------

const deleteList = ({ newAction, listId }) => async dispatch => {
  dispatch(listsActions.deleteListRequest());

  try {
    const { data: { action } } = await axios.post('/actions', newAction);
    await axios.delete(`/lists/${listId}`);

    dispatch(actionsActions.addActionSuccess(action));
    dispatch(listsActions.deleteListSuccess(listId))
  } catch (error) {
    dispatch(listsActions.deleteListError(error.message));
  }
}

const listsOperations = {
  addList,
  renameList,
  deleteList,
}

export default listsOperations;