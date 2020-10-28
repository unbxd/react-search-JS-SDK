import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import PageNavigationOptions from './PageNavigationOptions';
import { paginationTypes } from '../../config';

const paginationButtonTypes = {
  NUMBER: 'NUMBER',
  PREVIOUS: 'PREVIOUS',
  NEXT: 'NEXT'
};

const PaginationWrapper = (props) => {
  const {
    currentPage,
    isNext,
    isPrev,
    noOfPages,
    padding,
    onNextPageClick,
    onPreviousPageClick,
    onPageClick,
    PaginationItemComponent,
    paginationType
  } = props;

  if (paginationType !== paginationTypes.FIXED_PAGINATION) {
    return null;
  }

  if (noOfPages === 0) {
    return null;
  }

  const activePage = PaginationItemComponent ? (
    <PaginationItemComponent
      pagenumber={currentPage}
      type={paginationButtonTypes.NUMBER}
      label={currentPage}
      isSelected={true}
    />
  ) : (
    <Button
      className="UNX-pageNavigation__button -selected"
      data-pagenumber={currentPage}
      key={currentPage}
      data-testid={`UNX_pageNumber${currentPage}`}
    >
      {currentPage}
    </Button>
  );

  const { prevPages, nextPages } = PageNavigationOptions(
    currentPage,
    padding,
    noOfPages,
    PaginationItemComponent ? PaginationItemComponent : Button,
    onPageClick,
    paginationButtonTypes.NUMBER
  );

  return (
    <div className="UNX-pageNavigation__container">
      {isPrev &&
        (PaginationItemComponent ? (
          <PaginationItemComponent
            onClick={onPreviousPageClick}
            pagenumber={currentPage - 1}
            type={paginationButtonTypes.PREVIOUS}
            label={currentPage - 1}
            active={false}
          />
        ) : (
          <Button
            className="UNX-pageNavigation__button -action"
            onClick={onPreviousPageClick}
            data-pagenumber={currentPage - 1}
            key={currentPage - 1}
            data-testid={`UNX_pageNumber${currentPage-1}`}
          >
            &lt;
          </Button>
        ))}

      {prevPages}
      {activePage}
      {nextPages}

      {isNext &&
        (PaginationItemComponent ? (
          <PaginationItemComponent
            onClick={onNextPageClick}
            pagenumber={currentPage + 1}
            type={paginationButtonTypes.NEXT}
            label={currentPage + 1}
            data-testid={`UNX_pageNumber${currentPage+1}`}
            active={false}
          />
        ) : (
          <Button
            className="UNX-pageNavigation__button -action"
            onClick={onNextPageClick}
            data-pagenumber={currentPage + 1}
            key={currentPage + 1}
            data-testid={`UNX_pageNumber${currentPage+1}`}
          >
            &gt;
          </Button>
        ))}
    </div>
  );
};

PaginationWrapper.propTypes = {
  currentPage: PropTypes.number.isRequired,
  isNext: PropTypes.bool.isRequired,
  isPrev: PropTypes.bool.isRequired,
  noOfPages: PropTypes.number.isRequired,
  onNextPageClick: PropTypes.func.isRequired,
  onPreviousPageClick: PropTypes.func.isRequired,
  onPageClick: PropTypes.func.isRequired,
  padding: PropTypes.number,
  PaginationItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  paginationType: PropTypes.string.isRequired
};

export default PaginationWrapper;
