import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import {
  boardsOperations,
  globalActions,
  boardsSelectors,
} from '../../redux';

import actionsTypes from '../../actions-types';

import { ModalAddNewBoard } from '../../components';

import { Button, Nav } from 'react-bootstrap';
import { useHistory, useLocation } from "react-router";

import s from './MainPage.module.scss';


import scaleTransition from '../../scss/transitions/scale.module.scss';
import slideTransitions from '../../scss/transitions/slide.module.scss';

function HomePage() {
  const [isModalShow, setIsModalShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const ownBoards = useSelector(boardsSelectors.getOwnBoards);
  const otherBoards = useSelector(boardsSelectors.getOtherBoards);
  const currentBoardId = useSelector(boardsSelectors.getCurrentBoardId);
  const currentBoard = useSelector(boardsSelectors.getCurrentBoard);

  useEffect(() => {
    dispatch(boardsOperations.getAllBoards());
  }, [dispatch]);

  useEffect(() => {
    if (currentBoardId && currentBoardId !== currentBoard?.id) {
      history.push(`${location.pathname}/${currentBoardId}`);
    }
  }, [currentBoardId, currentBoard, location.pathname, history]);

  const ListItemsOfBoards = useCallback((boards) => {  
    return (    
      boards.map(({ id, title }) =>
        <CSSTransition
          key={id}
          timeout={200}
          appear={true}
          classNames={scaleTransition}
          unmountOnExit
        >
          <Nav.Item as="li" className={s.listItem}>
            <Nav.Link
              href={`${location.pathname}/${id}`}
              className={s.boardBtn}>
                {title}
            </Nav.Link>
          </Nav.Item>
        </CSSTransition>
      )
    )
  }, [location.pathname]);

  const toggleModal = () => {
    setIsModalShow(state => !state);
  }

  const onAddBoard = useCallback((title) => {
    if (!title.trim()) {
      dispatch(globalActions.createNotificationText("Nothing to add"));
      return;
    }

    const newAction = {
      actionType: actionsTypes.add,
    }

    const newBoard = {
      title,
    }

    dispatch(boardsOperations.addBoard(newAction, newBoard));
  }, [dispatch]);
  

  return (
    <div className={s.container}>
			<h2 className={s.title}>
        <span className={`material-icons-outlined ${s.icon}`}>person_outline</span>
        Personal Boards
      </h2>
      
      <TransitionGroup component="ul" className={s.list}>
        {ListItemsOfBoards(ownBoards)}

        <CSSTransition
          key="addNew"
          timeout={200}
          appear={true}
          classNames={slideTransitions}
        >
          <li className={s.listItem}>
            <Button
              onClick={toggleModal}
              className={s.btnCreateNewBoard}
              variant="secondary" block>
              Create new board...
            </Button>
          </li>
        </CSSTransition>

      </TransitionGroup>      

      {otherBoards.length > 0 &&
        <h2 className={s.title}>
          <span className={`material-icons-outlined ${s.icon}`}>people_outline</span>
          Other Boards
        </h2>
      }
      <TransitionGroup component="ul" className={s.list}>
        {ListItemsOfBoards(otherBoards)}
      </TransitionGroup>
      
      {isModalShow &&
        <ModalAddNewBoard
        isModalShow={isModalShow}
        onModalClose={toggleModal}
        onSubmitForm={onAddBoard}
        />}      
    </div>
  )
}

export default HomePage;