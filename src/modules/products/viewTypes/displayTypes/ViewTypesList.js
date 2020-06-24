import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../../components';

const ViewTypesList = ({ productViewType, productViewTypes, onProductViewClick, ProductsViewListItemComponent }) => {
    
    return (<div className='UNX-productsview-list'>
        <List
            idAttribute={''}
            items={productViewTypes}
            activeItem={productViewType}
            ListItem={ProductsViewListItemComponent}
            onClick={onProductViewClick}
            className={'UNX-productsview-list-container'} />
    </div>)
}

ViewTypesList.propTypes = {

}

export default ViewTypesList;
