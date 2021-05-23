import { useCallback, useEffect, useRef } from 'react';

import { InputGroup, FormControl } from 'react-bootstrap';

import { ButtonsAgreeCancel } from '../';

import s from './AddCard.module.scss';

function AddCard({onAddCard, onClose}) {
  const input = useRef();

  useEffect(() => {
		const onKeyDown = event => {
			if (event.code === 'Escape') {
				onClose();
			}
		};
		
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		}
	}, [onClose]);

  const onSave = useCallback(() => {

    onAddCard(input.current.value);
    onClose();
  }, [onAddCard, onClose]);

  return (
    <div>
      <InputGroup className={s.inputContainer}>
        <FormControl
          ref={input}
          autoFocus
          className={s.input}
          as="textarea" />
      </InputGroup>

      <ButtonsAgreeCancel
        agreeCaption="Add"
        onAgree={onSave}
        onCancel={onClose}
      />
    </div>
  )
}

export default AddCard;