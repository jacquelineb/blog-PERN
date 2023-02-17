import React from 'react';
import style from '../styles/NotFound.module.scss';

function NotFound() {
  return (
    <div className={style.NotFound}>
      <div className={style.status}>404</div>
      <div>Page Not Found</div>
    </div>
  );
}

export default NotFound;
