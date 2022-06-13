import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Pagination.module.scss';

function Pagination({ currPage, totalNumPages }) {
  return (
    <div className={style.container}>
      <div className={style.pageLinksContainer}>
        {currPage > 1 ? (
          <div className={style.previous}>
            <Link to={`/page/${currPage - 1}`}>Previous</Link>
          </div>
        ) : null}
        {currPage < totalNumPages ? (
          <div className={style.next}>
            <Link to={`/page/${currPage + 1}`}>Next</Link>
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
