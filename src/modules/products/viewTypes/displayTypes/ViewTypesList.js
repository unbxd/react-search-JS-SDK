import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../../components';
import { listItemTypes } from '../../../../components/utils';

const ViewTypesList = ({
    productViewType,
    productViewTypes,
    onProductViewClick,
    ProductsViewListItemComponent }) => {

    return (<div className='UNX-productsview-list'>
        <List
            idAttribute={''}
            items={productViewTypes}
            activeItem={productViewType}
            ListItem={ProductsViewListItemComponent}
            onClick={onProductViewClick}
            className={'UNX-productsview-list-container'}
            itemsType={listItemTypes.PRIMITIVE} />
    </div>)
}

ViewTypesList.propTypes = {
    productViewType: PropTypes.string,
    productViewTypes: PropTypes.arrayOf(PropTypes.string),
    onProductViewClick: PropTypes.func.isRequired,
    ProductsViewListItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default ViewTypesList;
