import React from 'react';
import { Link } from 'react-router-dom';

function BlogPagination({ currPage, totalNumPages }) {
  return (
    <div>
      {currPage > 1 ? <Link to={`/page/${currPage - 1}`}>Newer posts</Link> : null}
      {currPage < totalNumPages ? <Link to={`/page/${currPage + 1}`}>Older posts</Link> : null}
      <p>
        Page {currPage} of {totalNumPages}
      </p>
    </div>
  );
}

export default BlogPagination;
