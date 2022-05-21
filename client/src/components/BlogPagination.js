import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/BlogPagination.module.scss';

function BlogPagination({ currPage, totalNumPages }) {
  return (
    <div className={style.BlogPaginationContainer}>
      <div className={style.pageLinksContainer}>
        <div>
          {currPage > 1 ? (
            <Link className={style.pageLink} to={`/page/${currPage - 1}`}>
              Newer posts
            </Link>
          ) : null}
        </div>
        <div>
          {currPage < totalNumPages ? (
            <Link className={style.pageLink} to={`/page/${currPage + 1}`}>
              Older posts
            </Link>
          ) : null}
        </div>
      </div>
      <div className={style.pageNumber}>
        Page {currPage} of {totalNumPages}
      </div>
    </div>
  );
}

export default BlogPagination;
