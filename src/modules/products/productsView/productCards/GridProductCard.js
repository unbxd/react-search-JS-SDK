import React from 'react';
import PropTypes from 'prop-types';

import SwatchItem from '../swatches';
import { List } from '../../../../components';
import { getProductFields } from '../../utils';

class GridProductCard extends React.Component {

    constructor(props) {
        super(props);

        const { itemData,
            productMap,
            showVariants,
            productVariantMap,
            showSwatches,
            swatchAttributes,
            groupBy
        } = this.props;
        //Get the datas from the product bases on productMap and create the card
        const productValues = getProductFields({
            itemData,
            productMap,
            showVariants,
            productVariantMap,
            showSwatches,
            swatchAttributes,
            groupBy
        });

        this.state = { productValues };
    }

    onSwatchClick = (event) => {
        const currentSwatchId = event.target.dataset['variant_id'];

        this.setState((currentState) => {
            return {
                productValues: {
                    ...currentState.productValues,
                    swatches: currentState.productValues.swatches.map(swatchObject => {
                        if (swatchObject.swatchId === currentSwatchId) {
                            return { ...swatchObject, active: true }
                        } else {
                            return { ...swatchObject, active: false }
                        };
                    })
                }
            }
        })
    }



    render() {

        const {swatchItemComponent} = this.props;
        const { productValues } = this.state;
        const [activeSwatch] = productValues['swatches'].filter((swatch) => {
            return swatch.active
        });

        const product = { ...productValues, ...activeSwatch };
        const {
            uniqueId,
            productName,
            imageUrl,
            productUrl,
            price,
            sellingPrice,
            swatches } = product;

        //Add support for router as a config
        return (<div className='UNX-product-card-container'>
            <a href={productUrl} className={`UNX-product-card UNX-grid-card`} data-uniqueid={uniqueId}>
                <img className='UNX-image' src={imageUrl} data-uniqueid={uniqueId} />
                <p className='UNX-product-name' data-uniqueid={uniqueId}>{productName}</p>
                <p className='UNX-price' data-uniqueid={uniqueId}>{price}</p>
                <p className='UNX-selling-price' data-uniqueid={uniqueId}>{sellingPrice}</p>
            </a>
            <div className='UNX-swatch-content'>
                <List
                    items={swatches}
                    ListItem={swatchItemComponent || SwatchItem}
                    idAttribute={'swatchId'}
                    onClick={this.onSwatchClick}
                    className='UNX-swatch-item-list-container' />
            </div>
        </div>)
    }
}

GridProductCard.propTypes = {
    itemData: PropTypes.object.isRequired,
    productMap: PropTypes.object.isRequired,
    showVariants: PropTypes.bool.isRequired,
    productVariantMap: PropTypes.object.isRequired
}

export default GridProductCard;
