import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from '../styles/Modal.module.scss';

function Modal({ active, handleClose, title, content }) {
  useEffect(() => {
    if (active) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    return () => (document.body.style.overflowY = 'scroll');
  }, [active]);

  return active
    ? ReactDOM.createPortal(
        <div className={style.modalContainer}>
          <div className={style.modalContent}>
            <button onClick={handleClose}>Close</button>
            <div className={style.title}>{title}</div>
            {content}
          </div>
        </div>,
        document.getElementById('root')
      )
    : null;
}

export default Modal;
