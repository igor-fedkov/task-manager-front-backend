import { Button } from 'react-bootstrap';

import s from './ButtonsAgreeCancel.module.scss';

function ButtonsAgreeCancel({agreeCaption, onAgree, onCancel}) {
  return (
    <div className={s.buttonsContainer}>
      <Button onClick={onAgree} variant="success">{agreeCaption}</Button>
      <Button onClick={onCancel} className={s.btnClose} variant="secondary">
        <span className={`material-icons-outlined ${s.icon}`}>close</span>
      </Button>
    </div>
  )
}

export default ButtonsAgreeCancel;