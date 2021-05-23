import { useCallback, useRef, useEffect } from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';

import { ButtonsAgreeCancel } from '../';

import s from './AddList.module.scss';

function AddList({ onAddList, onClose, defaultText='' }) {
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

  const onSubmit = useCallback(e => {
    e.preventDefault();

    onAddList(input.current.value);
    onClose();
  }, [onAddList, onClose]);

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className={s.inputContainer}>
        <FormControl
          ref={input}
          autoFocus
          className={s.inputField}
          placeholder="Add a list..."
          defaultValue={defaultText}
        />
      </InputGroup>

      <ButtonsAgreeCancel
        agreeCaption="Save"
        onAgree={onSubmit}
        onCancel={onClose}
      />
    </Form>
  )
}

export default AddList;