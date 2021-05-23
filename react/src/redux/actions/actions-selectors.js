import { createSelector } from '@reduxjs/toolkit';

import { howMuchTimeHasPassed } from '../../utils';
import { boardsSelectors, listsSelectors, cardsSelectors } from '../';
import actionsTypes from '../../actions-types';

//-------------------------------------------------------------

const getAllBoardActions = state => state.actions.items;

const getBoardActions = createSelector([getAllBoardActions, boardsSelectors.getCurrentBoardId],
  (actions, currentBoardId) => actions.filter(action => action.objId === currentBoardId))

const listsActions = createSelector([getAllBoardActions, listsSelectors.getBoardLists],
  (actions, lists) => actions.filter(action => lists.find(({ id }) => action.objId === id)));

const cardsActions = createSelector([getAllBoardActions, cardsSelectors.getCardsOfBoard],
  (actions, cards) => actions.filter(action => cards.find(({ id }) => action.objId === id ||
      (action.endPointId === id && action.actionType === actionsTypes.addComment))));

//-------------------------------------------------------------

const createCardActivity = ({ actions, lists, cards }) =>
  actions.map(({ id, owner, objId, endPointId, actionType, createdAt: date }) => {
    const result = {};
    result.id = id;
    result.userEmail = owner.email;

    switch (actionType) {
      case actionsTypes.add:
        result.actionType = ' added ';
        result.objTitle = cards.find(({ id }) => id === objId).title;
        result.pretext = ' to ';
        result.endPointTitle = lists.find(({ id }) => id === endPointId).title;
        break;
      case actionsTypes.delete:
        result.actionType = ' removed ';
        result.objTitle = cards.find(({ id }) => id === objId).title;
        result.pretext = ".";
        result.endPointTitle = null;
        break;
      case actionsTypes.addComment:
        result.actionType = ' added comment in ';
        result.objTitle = cards.find(({ id }) => id === endPointId).title;
        result.pretext = ".";
        result.endPointTitle = null;
        break;
      case actionsTypes.editDescription:
        result.actionType = ' edited description in ';
        result.objTitle = cards.find(({ id }) => id === objId).title;
        result.pretext = ".";
        result.endPointTitle = null;
        break;
      case actionsTypes.move:
        result.actionType = ' moved ';
        result.objTitle = cards.find(({ id }) => id === objId).title;
        result.pretext = ' to ';
        result.endPointTitle = lists.find(({ id }) => id === endPointId).title;
        break;
      
      default:
        console.log(`unknown action type: ${actionType}`);
    }
    result.howLongAgo = howMuchTimeHasPassed(date);
    result.date = date;

    return result;
  });

//-------------------------------------------------------------

const getBoardActivity = createSelector([getBoardActions, boardsSelectors.getCurrentBoard],
  (actions, currentBoard) =>
    actions.map(({ id, owner, actionType, createdAt: date }) => {
      const result = {};
      result.id = id;
      result.userEmail = owner.email;

      switch (actionType) {
        case actionsTypes.add:
          result.actionType = ' added this board.';
          result.objTitle = null;
          break;
        
        case actionsTypes.delete:
          result.actionType = ' deleted board ';
          result.objTitle = currentBoard.title;
          break;

        default:
          console.log(`unknown action type: ${actionType}`);
      }
      
      result.pretext = null;
      result.endPointTitle = null;
      result.howLongAgo = howMuchTimeHasPassed(date);
      result.date = date;

      return result;
    })
);

const getListsActivity = createSelector([
  listsActions,
  listsSelectors.getBoardLists],
  (
    actions,
    lists) =>

    actions.map(({ id, owner, objId, actionType, createdAt: date }) => {
      const result = {};
      result.id = id;
      result.userEmail = owner.email;

      switch (actionType) {
        case actionsTypes.add:
          result.actionType = ' added ';
          result.pretext = ' to board.';
          break;
        
        case actionsTypes.delete:
          result.actionType = ' removed ';
          result.pretext = ' from board.';
          break;
        
        case actionsTypes.rename:
          result.actionType = ' renamed list to ';
          result.pretext = '.';
          break;
        
        default:
          console.log(`unknown action type: ${actionType}`);
      }
      result.objTitle = lists.find(({ id }) => id === objId).title;
      result.endPointTitle = null;
      result.howLongAgo = howMuchTimeHasPassed(date);
      result.date = date;

      return result;
    })
);

const getCardsActivity = createSelector([
  cardsActions,
  listsSelectors.getBoardLists,
  cardsSelectors.getCardsOfBoard],
  (
    actions,
    lists,
    cards) => createCardActivity({actions, lists, cards})
);

//-------------------------------------------------------------

const getActivityOfCurrentCard = createSelector([
  cardsActions,
  listsSelectors.getBoardLists,
  cardsSelectors.getCurrentCard,],
  
  (
    actions,
    lists,
    card) => createCardActivity({
      actions: actions.filter(({ objId, endPointId, actionType }) => objId === card?.id || (endPointId === card?.id && actionType === actionsTypes.addComment)),
      lists,
      cards: [card]
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
);

const getActivityOfCurrentBoard = createSelector([
  getBoardActivity,
  getListsActivity,
  getCardsActivity],

  (
    boardActivity,
    listsActivity,
    cardsActivity) => {
    
    const activity = [...boardActivity, ...listsActivity, ...cardsActivity].sort((a, b) => (new Date(b.date)) - (new Date(a.date)));
    
    return activity;
  }
)

const actionsSelectors = {
  getActivityOfCurrentCard,
  getActivityOfCurrentBoard,
}

export default actionsSelectors;