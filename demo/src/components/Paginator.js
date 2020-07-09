import React from 'react';

import { Pagination } from '@unbxd-ui/react-search-sdk';

const Paginator = () => {
    return (
        <Pagination pagePadding={2}>
            <div className='UNX-pagination__pageSize'>
                Results Per Page <Pagination.NumberOfProducts />
            </div>
            <div className='UNX-pagination__pageNavigation'>
                <Pagination.Navigation />
            </div>
        </Pagination>
    )
}

export default Paginator;
