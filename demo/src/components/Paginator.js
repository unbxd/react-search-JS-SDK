import React from 'react';

import { Pagination } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

export const PaginationItemComponent = ({ itemData, onClick }) => {
    const { pageNumber, type, isSelected = false } = itemData;
    return (
        <div data-pagenumber={pageNumber} onClick={onClick ? onClick : null}>
            {type === 'NUMBER' && (
                <button
                    className={`UNX-pageNavigation__button ${
                        isSelected ? '-isSelected' : ''
                    }`}
                >
                    {pageNumber}
                </button>
            )}
            {type === 'PREVIOUS' && (
                <button className="UNX-pageNavigation__button -action">
                    &lt;
                </button>
            )}
            {type === 'NEXT' && (
                <button className="UNX-pageNavigation__button -action">
                    &gt;
                </button>
            )}
        </div>
    );
};

const onPageChange = (page) => {
    console.log('Page change ', page);
    scrollTop();
    return true;
};

const Paginator = () => {
    return (
        <div className="UNX-pagination__pageNavigation">
            <Pagination padding={3} onPageChange={onPageChange} />
        </div>
    );
};

export default Paginator;
