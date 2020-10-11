import React from 'react';

import { Pagination } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

const onPageChange = (page) => {
    console.log('Page change ', page);
    scrollTop();
    return true;
};

const Paginator = () => {
    return (
        <div className="UNX-pagination__pageNavigation">
            <Pagination padding={3} /*onPageChange={onPageChange}*/ />
        </div>
    );
};

export default Paginator;
