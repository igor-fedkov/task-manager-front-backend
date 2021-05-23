import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { useState, useEffect, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import actionsTypes from '../../actions-types';

import {
  globalActions,
  boardsActions,
  listsOperations,
  boardsSelectors,
  listsSelectors,
  cardsSelectors,
  cardsOperations,
  boardsOperations,
} from '../../redux';
import routes from '../../routes';

import {
  CardsList,
  AddList,
  ModalCardDetails,
  ModalBoardMenu,
  LoaderSpinner,
} from '../../components';

import { Button } from 'react-bootstrap';
import s from './BoardPage.module.scss';
import scaleTransition from '../../scss/transitions/scale.module.scss';
import slideTransitions from '../../scss/transitions/slide.module.scss';

function BoardPage() {
  const [listIdForAddCard, setListIdForAddCard] = useState(null);
  const [listIdForRenameList, setListIdForRenameList] = useState(null);
  const [isAddListShow, setIsAddListShow] = useState(false);
  const [isBoardMenuShow, setIsBoardMenuShow] = useState(false);
  const [isCardDetailsShow, setIsCardDetailsShow] = useState(false);

  const match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentBoard = useSelector(boardsSelectors.getCurrentBoard);
  const currentCard = useSelector(cardsSelectors.getCurrentCard);
  const lists = useSelector(listsSelectors.getBoardListsActive);
  const cards = useSelector(cardsSelectors.getCardsOfBoard);
  const currentBoardError = useSelector(boardsSelectors.getError);
  const loadingBoardData = useSelector(boardsSelectors.getLoading);

  const isLoadingLists = useSelector(listsSelectors.getLoading);
  const isLoadingCards = useSelector(cardsSelectors.getLoading);
  const isLoading = isLoadingLists || isLoadingCards;

  const { boardId } = match.params;

  useEffect(() => {
    dispatch(boardsActions.setCurrentBoardId(boardId));
    dispatch(boardsOperations.getCurrentBoard(boardId));
    if (currentBoardError) {
      dispatch(boardsActions.setCurrentBoardId(null));
      history.replace(routes.main);
    }
  }, [boardId, currentBoardError, history, dispatch]);

  const onToggleAddList = useCallback(() => {
    setIsAddListShow(state => !state);
  }, []);

  const onToggleBoardMenu = useCallback(() => {
    setIsBoardMenuShow(state => !state);
  }, []);

  const onToggleCardDetailsShow = useCallback(() => {
    setIsCardDetailsShow(state => !state);
  }, []);


  //---------onAddList---------
  const onAddList = useCallback((title) => {
    if (!title.trim()) {
      dispatch(globalActions.createNotificationText("Nothing to add"));
      return;
    }

    const newAction = {
      actionType: actionsTypes.add,
    }

    const newList = {
      boardId,
      title,
    }
    dispatch(listsOperations.addList({ newAction, newList }));
  }, [boardId, dispatch]);


  //---------onMoveCard---------

  const onMoveCard = useCallback(listId => {
    if (currentCard.listId === listId) {
      return;
    }

    const newAction = {
      actionType: actionsTypes.move,
      endPointId: listId,
    }

    const cardId = currentCard.id;

    dispatch(cardsOperations.moveCard({ newAction, listId, cardId }));
  }, [currentCard, dispatch]);

  return (
    loadingBoardData
    ? <LoaderSpinner/>
    : <div className={s.board}>
      {isLoading && <LoaderSpinner position={'topRight'}/>}
      <div className={s.container}>
        <div className={s.boardTitleAndMenuBtnContainer}>
          <h1 className={s.title}>{currentBoard?.title}</h1>
          <Button onClick={onToggleBoardMenu} className={s.btnShowMenu} variant="link">Show Menu</Button>

          {isBoardMenuShow &&
            <ModalBoardMenu toggleModalShow={onToggleBoardMenu} />
          }
        </div>

        <TransitionGroup component="ul" className={s.list}>
          {lists.map(list =>
            <CSSTransition
              key={list.id}
              appear={true}
              timeout={200}
              classNames={scaleTransition}
              unmountOnExit
            >
              <li key={list.id} className={s.listItem}>
                <CardsList
                  onShowCardDetails={onToggleCardDetailsShow}
                  onMoveCard={onMoveCard}
                  list={list}
                  cards={cards.filter(({listId, active}) => listId === list.id && active).sort((a, b) => a.title < b.title ? -1 : 1)}
                  listIdForAddCard={listIdForAddCard}
                  setListIdForAddCard={setListIdForAddCard}
                  listIdForRenameList={listIdForRenameList}
                  setListIdForRenameList={setListIdForRenameList}
                />
              </li>
            </CSSTransition>
          )}

          {isAddListShow 
            ? <CSSTransition
              timeout={200}
              appear={true}
              classNames={scaleTransition}
              unmountOnExit
            >
              <li className={s.listItem}>
                <AddList onAddList={onAddList} onClose={onToggleAddList} />
              </li>
            </CSSTransition>

            : <CSSTransition
                timeout={200}
                appear={true}
                classNames={slideTransitions}
                unmountOnExit
              >
              <li className={`${s.listItem} ${s.addNewList}`}>
                <Button
                  onClick={onToggleAddList}
                  className={s.btnCreateList}
                  variant="primary"
                  block>
                Add a list...
                </Button>
              </li>
            </CSSTransition>
          }
        </TransitionGroup>
      </div>

      <ModalCardDetails
        isModalShow={isCardDetailsShow}
        onModalClose={onToggleCardDetailsShow}
      />
    </div>
  )
}

export default BoardPage;