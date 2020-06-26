import React from 'react';

import { ProductContextConsumer } from '../context';
import { ViewTypesList, ViewTypesDropdown } from './displayTypes';
import { productViewTypes as productViewTypesOptions, getProductViewType, productViewDisplayTypes } from '../utils';


const ViewTypes = () => {
    return (<ProductContextConsumer>{({ data, helpers }) => {

        const { productViewTypes, productViewType, productViewDisplayType } = data;
        const { onViewToggle, getSearchResults, ProductsViewListItemComponent } = helpers;
        
        const { numberOfProducts = 0 } = getSearchResults() || {};
        const validViewTypes = getProductViewType(productViewTypes);

        if (validViewTypes.length < 2 || numberOfProducts === 0) {
            return null;
        }

        return (<div className='UNX-view-types-container'>
            {
                productViewDisplayType === productViewDisplayTypes.DROPDOWN &&
                <ViewTypesDropdown
                    productViewType={productViewType}
                    productViewTypes={productViewTypes}
                    onProductViewClick={onViewToggle}
                />
            }

            {
                productViewDisplayType === productViewDisplayTypes.LIST &&
                <ViewTypesList
                    productViewType={productViewType}
                    productViewTypes={productViewTypes}
                    onProductViewClick={onViewToggle}
                    ProductsViewListItemComponent={ProductsViewListItemComponent}
                />
            }
        </div>)
    }}
    </ProductContextConsumer>)
}

export default ViewTypes;
