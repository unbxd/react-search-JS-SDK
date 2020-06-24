import React from 'react';
import PropTypes from 'prop-types';

import { ListProductCard } from '../productCards';
import { List } from '../../../../components/index';

const ListView = (props) => {

    const { products = [],
        productMap,
        showVariants,
        productVariantMap,
        onProductClick,
        ProductItemComponent } = props;

    return (<div className='UNX-product-container'>{
        <List
            idAttribute={'uniqueId'}
            items={products}
            ListItem={ProductItemComponent || ListProductCard}
            onClick={onProductClick}
            productMap={productMap}
            showVariants={showVariants}
            productVariantMap={productVariantMap}
            className='UNX-list-view grid-cols-1' />
    }
    </div>)
}
ListView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    productMap: PropTypes.object.isRequired,
    showVariants: PropTypes.bool.isRequired,
    productVariantMap: PropTypes.object.isRequired,
    onProductClick: PropTypes.func.isRequired
}

export default ListView;
