import React from 'react';
import styles from '../styles/Modal.module.scss';

function Modal({ display, handleClose, children }) {
  console.log(display);
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
