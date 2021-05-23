import { useDispatch, useSelector } from "react-redux";
import { useCallback } from 'react';
import { useHistory } from "react-router";
import { Modal } from 'react-bootstrap';

import {
  boardsOperations,
  boardsSelectors,
  authSelectors,
  actionsSelectors,
  globalActions,
} from '../../redux';

import routes from '../../routes';

import actionsTypes from '../../actions-types';

import {
  ListActivity,
  LoaderSpinner,
} from '../../components';

import s from './ModalBoardMenu.module.scss';

function ModalBoardMenu({toggleModalShow}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentBoard = useSelector(boardsSelectors.getCurrentBoard);
  const activity = useSelector(actionsSelectors.getActivityOfCurrentBoard);
  const userId = useSelector(authSelectors.getUserId);
  const loadingBoardData = useSelector(boardsSelectors.getLoading);

  //---------onDeleteBoard---------
  const onDeleteBoard = useCallback(() => {
    if (currentBoard.owner !== userId) {
      dispatch(globalActions.createNotificationText('Access denied.'));
      return;
    }

    const newAction = {
      actionType: actionsTypes.delete,
      objId: currentBoard.id,
    }

    dispatch(boardsOperations.deleteBoard({ newAction, boardId: currentBoard.id }))
    history.replace(routes.main);
  }, [currentBoard, userId, history, dispatch]);
 
  return (
    <Modal
      className={s.modal}
      dialogClassName={s.dialog}
      backdropClassName={s.backdrop}
      contentClassName={s.content}
      show={true}
      onHide={toggleModalShow}>
      <Modal.Header className={s.modalHeader} closeButton>
        <Modal.Title className={s.title}>
          Menu
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={s.modalBody}>
        {loadingBoardData
          ? <LoaderSpinner />
          : <button
              onClick={onDeleteBoard}
              className={s.btnRemoveBoard}>
            Remove board
          </button>
        }
        
        <div className={s.ActivityContainer}>
          <ListActivity activity={activity}/>
        </div>  
      </Modal.Body> 
    </Modal>
  )
}

export default ModalBoardMenu;