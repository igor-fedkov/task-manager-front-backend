import { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function ModalAddNewBoard({ isModalShow, onModalClose, onSubmitForm }) {

  const input = useRef();

  const onSubmit = e => {
    e.preventDefault();

    onSubmitForm(input.current.value);
  }

  return (
    <Modal show={isModalShow} onHide={onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New board</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Board Title</Form.Label>
            <Form.Control type="text" ref={input} autoFocus placeholder="Enter board title"/>
          </Form.Group>
          <Button type="submit" variant="success">Add</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalAddNewBoard;