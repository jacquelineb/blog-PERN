import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Pagination.module.scss';

function Pagination({ onChange, currPage, totalNumPages }) {
  return (
    <div className={style.container}>
      <div className={style.pageLinksContainer}>
        {currPage > 1 ? (
          <Link
            className={style.pageLink}
            to={`/page/${currPage - 1}`}
            onClick={() => onChange(currPage - 1)}
          >
            Previous
          </Link>
        ) : null}
        {currPage < totalNumPages ? (
          <Link className={style.pageLink} to={`/page/${currPage + 1}`}>
            Next
          </Link>
        ) : null}
      </div>
      <div className={style.pageNumber}>
        Page {currPage} of {totalNumPages}
      </div>
    </div>
  );
}

export default Pagination;
