import React from 'react';

import { PaginationContextConsumer } from '../context';
import { NumberOfProductsDropdown, NumberOfProductsList } from './displayTypes';
import { pageSizeDisplayTypes } from '../utils';

const NumberOfProducts = () => {

    return (<PaginationContextConsumer>
        {({ data, helpers }) => {

            const { pageSizeDisplayType, noOfPages, pageSize, pageSizeOptions } = data;
            const { onPageSizeClick, PageSizeItemComponent } = helpers;

            if (noOfPages === 0) {
                return null;
            }

            //Decide which DisplayType we using
            return (
                <div className='UNX-pagesize-container'>
                    {
                        pageSizeDisplayType === pageSizeDisplayTypes.DROPDOWN &&
                        <NumberOfProductsDropdown
                            pageSize={pageSize}
                            pageSizeOptions={pageSizeOptions}
                            onPageSizeClick={onPageSizeClick}
                        />
                    }

                    {
                        pageSizeDisplayType === pageSizeDisplayTypes.LIST &&
                        <NumberOfProductsList
                            pageSize={pageSize}
                            pageSizeOptions={pageSizeOptions}
                            onPageSizeClick={onPageSizeClick}
                            PageSizeItemComponent={PageSizeItemComponent}
                        />
                    }
                </div>)
        }}

    </PaginationContextConsumer>)
}

export default NumberOfProducts;
