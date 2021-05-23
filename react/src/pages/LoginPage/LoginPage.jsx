import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
  authOperations,
} from '../../redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import s from './LoginPage.module.scss';

function LoginPage() {
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();

  //----------onSubmit----------

  const onSubmit = useCallback(e => {
    e.preventDefault();
        
    const user = {
      email: email.current.value.toLowerCase(),
      password: password.current.value
    };
    
    dispatch(authOperations.login(user))
  }, [dispatch]);

  return (
    <div>      
      <Form onSubmit={onSubmit} className={s.form}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default LoginPage;