import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from '../styles/Modal.module.scss';
import Icon from './Icon';

function Modal({ active, handleClose, title, content }) {
  useEffect(() => {
    if (active) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => (document.body.style.overflowY = 'auto');
  }, [active]);

  return active
    ? ReactDOM.createPortal(
        <div className={style.modalContainer}>
          <div className={style.modalContent}>
            <button className={style.closeBtn} onClick={handleClose} title='Close'>
              <Icon name='close' size='36' />
            </button>
            <div>
              <div className={style.title}>{title}</div>
              {content}
            </div>
          </div>
        </div>,
        document.getElementById('root')
      )
    : null;
}

export default Modal;
