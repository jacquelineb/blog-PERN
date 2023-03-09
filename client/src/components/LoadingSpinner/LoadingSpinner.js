import React from 'react';
import style from './LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <div className={style.LoadingSpinner}>
      <div className={style.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
