import React, { useEffect } from 'react';
import styles from '../styles/Modal.module.scss';

function Modal({ display, handleClose, children }) {
  useEffect(() => {
    if (display) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    return () => (document.body.style.overflowY = 'scroll');
  }, [display]);

  return display ? (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button onClick={handleClose}>Close</button>
        {children}
      </div>
    </div>
  ) : null;
}

export default Modal;
