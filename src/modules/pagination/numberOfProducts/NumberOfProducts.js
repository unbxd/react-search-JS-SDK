import React from 'react';

import { PaginationContextConsumer } from '../context';
import { NumberOfProductsDropdown, NumberOfProductsList } from './displayTypes';
import { pageSizeDisplayTypes } from '../utils';

const NumberOfProducts = () => {

    return (<PaginationContextConsumer>
        {({ pageSizeDisplayType, noOfPages, ...props }) => {

            if (noOfPages === 0) {
                return null;
            }

            //Decide which DisplayType we using
            return (
                <div className='UNX-pagesize-container'>
                    {
                        pageSizeDisplayType === pageSizeDisplayTypes.DROPDOWN &&
                        <NumberOfProductsDropdown {...props} />
                    }

                    {
                        pageSizeDisplayType === pageSizeDisplayTypes.LIST &&
                        <NumberOfProductsList {...props} />
                    }
                </div>)
        }}

    </PaginationContextConsumer>)
}

export default NumberOfProducts;
