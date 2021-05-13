import React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from '../../common/utils';
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
        paginationItemComponent,
        paginationType
    } = props;

    if (paginationType !== paginationTypes.FIXED_PAGINATION) {
        return null;
    }

    if (noOfPages === 0) {
        return null;
    }

    const activePage = paginationItemComponent ? (
        cloneElement(paginationItemComponent, {
            onClick: onPreviousPageClick,
            itemData: {
                pageNumber: currentPage,
                type: paginationButtonTypes.NUMBER,
                isSelected: true
            }
        })
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
        paginationItemComponent || Button,
        onPageClick,
        paginationButtonTypes.NUMBER
    );

    return (
        <div className="UNX-pageNavigation__container">
            {isPrev &&
                (paginationItemComponent ? (
                    cloneElement(paginationItemComponent, {
                        onClick: onPreviousPageClick,
                        itemData: {
                            pageNumber: currentPage - 1,
                            type: paginationButtonTypes.PREVIOUS
                        }
                    })
                ) : (
                        <Button
                            aria-label="previous page button"
                            className="UNX-pageNavigation__button -action prev"
                            onClick={onPreviousPageClick}
                            data-pagenumber={currentPage - 1}
                            key={currentPage - 1}
                            data-testid={`UNX_pagination-prev`}
                        >
                            &lt;
                    </Button>
                    ))}

            {prevPages}
            {activePage}
            {nextPages}

            {isNext &&
                (paginationItemComponent ? (
                    cloneElement(paginationItemComponent, {
                        onClick: onNextPageClick,
                        itemData: {
                            pageNumber: currentPage + 1,
                            type: paginationButtonTypes.NEXT
                        }
                    })
                ) : (
                        <Button
                            aria-label="next page button"
                            className="UNX-pageNavigation__button -action next"
                            onClick={onNextPageClick}
                            data-pagenumber={currentPage + 1}
                            key={currentPage + 1}
                            data-testid={`UNX_pagination-next`}
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
    paginationItemComponent: PropTypes.element,
    paginationType: PropTypes.string.isRequired
};

export default PaginationWrapper;
