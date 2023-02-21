import React from 'react';
import style from '../styles/Pagination.module.scss';
import Icon from './Icon';

const SIBLING_COUNT = 2; // min number of page numbers to show on left and right of current page link

function Pagination({ currPage, totalNumPages, onPageChange }) {
  if (totalNumPages <= 1) {
    return null;
  }

  let pageNumbers = [];
  const numDisplayedPages = SIBLING_COUNT + 5;
  if (numDisplayedPages >= totalNumPages) {
    for (let i = 1; i <= totalNumPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const leftSiblingIndex = Math.max(currPage - SIBLING_COUNT, 1); // index of LEFTMOST sibling
    const rightSiblingIndex = Math.min(currPage + SIBLING_COUNT, totalNumPages); // index of RIGHTMOST sibling

    const showLeftFiller = leftSiblingIndex > 2;
    const showRightFiller = rightSiblingIndex < totalNumPages - 2;

    if (!showLeftFiller && showRightFiller) {
      const leftItemCount = 3 + 2 * SIBLING_COUNT;
      let leftPageNumbers = [];
      for (let i = 1; i <= leftItemCount; i++) {
        leftPageNumbers.push(i);
      }
      pageNumbers = [...leftPageNumbers, 'R', totalNumPages];
    } else if (showLeftFiller && !showRightFiller) {
      let rightItemCount = 3 + 2 * SIBLING_COUNT;
      let rightPageNumbers = [];
      for (let i = totalNumPages - rightItemCount + 1; i <= totalNumPages; i++) {
        rightPageNumbers.push(i);
      }
      pageNumbers = [1, 'L', ...rightPageNumbers];
    } else {
      let middlePageNumbers = [];
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        middlePageNumbers.push(i);
      }
      pageNumbers = [1, 'L', ...middlePageNumbers, 'R', totalNumPages];
    }
  }

  return (
    <div className={style.Pagination}>
      <ul className={style.pageButtons}>
        <li>
          <button
            className={style.pageButton}
            disabled={currPage === 1}
            type='button'
            onClick={() => {
              if (currPage > 1) {
                onPageChange(currPage - 1);
              }
            }}
          >
            <Icon name='chevronLeft' size='20' />
          </button>
        </li>
        {pageNumbers.map((pageNum) => {
          return (
            <li key={pageNum}>
              {isNaN(pageNum) ? (
                <span>...</span>
              ) : (
                <button
                  className={`${style.pageButton} ${
                    pageNum === currPage ? style.active : null
                  }`}
                  type='button'
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </button>
              )}
            </li>
          );
        })}
        <li>
          <button
            className={style.pageButton}
            disabled={currPage === totalNumPages}
            type='button'
            onClick={() => {
              if (currPage < totalNumPages) {
                onPageChange(currPage + 1);
              }
            }}
          >
            <Icon name='chevronRight' size='20' />
          </button>
        </li>
      </ul>
    </div>
  );
}

//https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
export default Pagination;
