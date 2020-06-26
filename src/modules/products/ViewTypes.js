import React from 'react';

import { ProductContextConsumer } from './context';
import { productViewTypes as productViewTypesOptions } from './utils'
import { getProductViewType } from './utils'

const ViewTypes = () => {
    return (<ProductContextConsumer>{({ data, helpers }) => {

        const { productViewTypes, productViewType } = data;
        const { onViewToggle, getSearchResults } = helpers;

        const { numberOfProducts = 0 } = getSearchResults() || {};
        const validViewTypes = getProductViewType(productViewTypes);

        if (validViewTypes.length < 2 || numberOfProducts === 0) {
            return null;
        }

        //Render options if more than 1 viewtypes are valid
        return (<div className='UNX-view-types'>
            {validViewTypes.indexOf(productViewTypesOptions.GRID) > -1 && <div className={`UNX-view-types grid ${productViewType === productViewTypesOptions.GRID ? 'active' : ''}`}
                data-viewtype={productViewTypesOptions.GRID} onClick={onViewToggle}>
                Grid
        </div>}
            {validViewTypes.indexOf(productViewTypesOptions.LIST) > -1 && <div className={`UNX-view-types list ${productViewType === productViewTypesOptions.LIST ? '' : 'active'}`}
                data-viewtype={productViewTypesOptions.LIST} onClick={onViewToggle}>
                List
        </div>}
        </div>)
    }}
    </ProductContextConsumer>)
}

export default ViewTypes;
