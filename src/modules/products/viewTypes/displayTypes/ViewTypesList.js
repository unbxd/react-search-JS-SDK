import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../../components';
import { listItemTypes } from '../../../../components/utils';

const ViewTypesList = ({
    productViewType,
    productViewTypes,
    onProductViewClick,
    ProductsViewItemComponent }) => {

    return (<List
        idAttribute={''}
        items={productViewTypes}
        activeItem={productViewType}
        ListItem={ProductsViewItemComponent}
        onClick={onProductViewClick}
        className={'UNX-viewTypes__list'}
        itemsType={listItemTypes.PRIMITIVE} />)
}

ViewTypesList.propTypes = {
    productViewType: PropTypes.string,
    productViewTypes: PropTypes.arrayOf(PropTypes.string),
    onProductViewClick: PropTypes.func.isRequired,
    ProductsViewItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default ViewTypesList;
