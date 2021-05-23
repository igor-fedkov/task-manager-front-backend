import { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  cardsSelectors,
  listsSelectors,
  authSelectors,
  actionsSelectors,
  commentsSelectors,
  cardsOperations,
  commentsOperations,
  boardsSelectors,
  globalActions,
} from '../../redux';

import actionsTypes from '../../actions-types';

import { ListActivity, CommentsList, LoaderSpinner } from '../';

import { Button, Modal, Form } from 'react-bootstrap';

import s from './ModalCardDetails.module.scss';

function ModalCardDetails({isModalShow, onModalClose}) {
  const [isBtnSaveDescriptionDisabled, setIsBtnSaveDescriptionDisabled] = useState(true);
  const [isDesctiptionEdit, setIsDesctiptionEdit] = useState(false);
  const [isBtnSaveCommentDisabled, setIsBtnSaveCommentDisabled] = useState(true);


  const inputDescription = useRef();
  const inputComment = useRef();

  const dispatch = useDispatch();

  const card = useSelector(cardsSelectors.getCurrentCard);
  const list = useSelector(listsSelectors.getCurrentList);
  const currentUser = useSelector(authSelectors.getUserEmail);
  let currentUserLogo = '';
  if (currentUser) {
    currentUserLogo = currentUser[0].toUpperCase();
  }
  const activity = useSelector(actionsSelectors.getActivityOfCurrentCard);
  const comments = useSelector(commentsSelectors.getCommentsCurrentCard);
  const userId = useSelector(authSelectors.getUserId);
  const currentBoard = useSelector(boardsSelectors.getCurrentBoard);

  const isLoadingCards = useSelector(cardsSelectors.getLoading);
  const isLoadingComments = useSelector(commentsSelectors.getLoading);

  const isLoading = isLoadingCards || isLoadingComments;

  //---------onRemoveCard----------
  const onRemoveCard = useCallback(() => {
    if (currentBoard.owner !== userId && list.owner !== userId && card.owner !== userId) {
      dispatch(globalActions.createNotificationText('Access denied.'));
      onModalClose();
      return;
    }

    const newAction = {
      actionType: actionsTypes.delete,
      objId: card.id,
    }

    dispatch(cardsOperations.deleteCard({ newAction, cardId: card.id }));
    onModalClose();
  }, [currentBoard?.owner, list?.owner, card, userId, onModalClose, dispatch]);
  

  //---------onAddDescription---------
  const onEditDescriptionClick = useCallback(() => {
    setIsDesctiptionEdit(true);
  }, []);

  const onInputDescription = useCallback(() => {
    if (inputDescription.current?.value.trim()) {
      setIsBtnSaveDescriptionDisabled(false);
    }
    else {
      setIsBtnSaveDescriptionDisabled(true);
    }    
  }, []);

  const onAddDescription = useCallback(() => {
    const newAction = {
      actionType: actionsTypes.editDescription,
      objId: card.id,
    }

    const description = inputDescription.current.value.trim();

    inputDescription.current.value = '';
    dispatch(cardsOperations.addDescription({ newAction, cardId: card.id, description }));
    setIsDesctiptionEdit(false);
  }, [card, dispatch]);


  //---------onAddComment---------

  const onInputComment = useCallback(() => {
    if (inputComment.current?.value.trim()) {
      setIsBtnSaveCommentDisabled(false);
    }
    else {
      setIsBtnSaveCommentDisabled(true);
    }    
  }, []);

  const onAddComment = useCallback(() => {
    const newAction = {
      actionType: actionsTypes.addComment,
      endPointId: card.id
    }

    const newComment = {
      cardId: card.id,
      text: inputComment.current.value,
    }
    dispatch(commentsOperations.addComment(newAction, newComment));
    inputComment.current.value = '';
    setIsBtnSaveCommentDisabled(true);
  }, [card?.id, dispatch]);
  
  
  return (
    <Modal
      className={s.modal}
      dialogClassName={s.dialog}
      contentClassName={s.content}
      show={isModalShow}
      onHide={onModalClose}
    >
      {isLoading && <LoaderSpinner position={'topRight'}/>}
      <Modal.Header className={s.modalHeader} closeButton>
        <Modal.Title className={s.titleContainer}>
          <span className={`material-icons-outlined ${s.icon}`}>credit_card</span>
          <span className={s.title}>{card?.title}</span>
          <p className={s.wherIsCard}>
            {'in list '}
            <span className={s.listTitle}>{list?.title}</span>
          </p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={s.modalBody}>
        <div className={s.actionsContainer}>
          <p className={s.actionsTitle}>Actions</p>
          <Button
            onClick={onRemoveCard}
            className={s.btnRemoveCard}
            variant="secondary"
            size="sm">
            <span className={`material-icons-outlined ${s.iconInside}`}>delete_outline</span>
            <span className={s.btnRemoveCaption}>Remove</span>
          </Button>
        </div>

        <div className={s.descriptionContainer}>
          <p className={s.description}>{card?.description}</p>
          {isDesctiptionEdit 
            ? <div>
                <Form.Control
                  onChange={onInputDescription}
                  ref={inputDescription}
                  className={s.inputField}
                  placeholder="Write a description..."
                  as="textarea"
                  // defaultValue={defaultDescription}
                  defaultValue={card?.description}
                  autoFocus
                  rows={2}
                />
                <Button
                  disabled={isBtnSaveDescriptionDisabled}
                  onClick={!isBtnSaveDescriptionDisabled ? onAddDescription : null}
                  className={s.btnSave}
                  variant="success">
                  Save
                </Button>
              </div>
            : <Button
                onClick={onEditDescriptionClick}
                className={s.btnEditDescription}
                variant="secondary"
                size="sm">
                  <span className={`material-icons-outlined ${s.iconInside}`}>subject</span>          
                  <span className={s.btnDescriptionCaption}>Edit the description...</span>
              </Button>
          }
        </div>

        <CommentsList comments={comments}/>
        <div className={s.commentTitleContainer}>
          <span className={`material-icons-outlined ${s.icon}`}>chat_bubble_outline</span>
          <p className={s.commentTitle}>Add Comment</p>
        </div>
        <div className={s.commentContainer}>
          <div className={s.userLogo}>{currentUserLogo}</div>
          <Form.Control
            onChange={onInputComment}
            ref={inputComment}
            className={s.inputField}
            placeholder="Write a comment..."
            as="textarea"
            rows={2}
          />
          <Button
            disabled={isBtnSaveCommentDisabled}
            onClick={!isBtnSaveCommentDisabled ? onAddComment : null}
            className={s.btnSave}
            variant="success">
            Save
          </Button>
        </div>
        

        <ListActivity activity={activity}/>
      </Modal.Body> 
    </Modal>
  )
}

export default ModalCardDetails;