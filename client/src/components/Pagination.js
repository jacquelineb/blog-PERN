import React from 'react';
import style from '../styles/Pagination.module.scss';

function Pagination({ currPage, totalNumPages, onPageChange }) {
  if (totalNumPages === 0) {
    return null;
  }

  return (
    <div className={style.Pagination}>
      <div className={style.buttonsContainer}>
        {currPage > 1 ? (
          <div className={style.previous}>
            <button onClick={() => onPageChange(currPage - 1)}>Previous</button>
          </div>
        ) : null}
        {currPage < totalNumPages ? (
          <div className={style.next}>
            <button onClick={() => onPageChange(currPage + 1)}>Next</button>
          </div>
        ) : null}
      </div>
      <div className={style.pageNumber}>
        Page {currPage} of {totalNumPages}
      </div>
    </div>
  );
}

export default Pagination;
