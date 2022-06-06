import React from 'react';
import style from '../styles/LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <div className={style.spinnerContainer}>
      <div className={style.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
