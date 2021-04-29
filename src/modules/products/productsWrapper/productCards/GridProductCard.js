import React from 'react';
import PropTypes from 'prop-types';

import SwatchItem from '../swatches';
import { List } from '../../../../components';

class GridProductCard extends React.Component {
    constructor(props) {
        super(props);

        const { itemData } = this.props;

        this.state = { productValues: itemData };
    }

    onSwatchClick = (event) => {
        const currentSwatchId = event.target.dataset['variant_id'];

        this.setState((currentState) => {
            return {
                productValues: {
                    ...currentState.productValues,
                    swatches: currentState.productValues.swatches.map(
                        (swatchObject) => {
                            if (swatchObject.swatchId === currentSwatchId) {
                                return { ...swatchObject, isSelected: true };
                            } else {
                                return { ...swatchObject, isSelected: false };
                            }
                        }
                    )
                }
            };
        });
    };

    render() {
        const { swatchItemComponent, idx, onClick, priceUnit } = this.props;
        const { productValues } = this.state;
        const activeSwatch = productValues['swatches'].find((swatch) => {
            return swatch.isSelected;
        });

        const product = { ...productValues, ...activeSwatch };
        const {
            uniqueId,
            title,
            imageUrl,
            productUrl,
            price,
            sellingPrice,
            swatches
        } = product;

        const prank = idx + 1;

        //Add support for router as a config
        return (
            <div className="UNX-productCard__container">
                <a
                    href={productUrl}
                    className={`UNX-product-card UNX-grid-card`}
                    data-uniqueid={uniqueId}
                    data-prank={prank}
                    onClick={onClick}
                >
                    <img
                        className="-image"
                        src={imageUrl}
                        data-uniqueid={uniqueId}
                        data-prank={prank}
                    />
                </a>

                <div className="UNX-swatch__container">
                    <List
                        items={swatches}
                        ListItem={swatchItemComponent || SwatchItem}
                        idAttribute={'swatchId'}
                        onClick={this.onSwatchClick}
                        className="UNX-swatch__list"
                    />
                </div>
                <div className={'-details'}>
                    <div
                        className="-title"
                        data-uniqueid={uniqueId}
                        data-prank={prank}
                    >
                        {title}
                    </div>

                    <div
                        className="-price"
                        data-uniqueid={uniqueId}
                        data-prank={prank}
                    >
                        {sellingPrice && (
                            <span>
                                {priceUnit}
                                {sellingPrice}
                            </span>
                        )}
                        {price && price !== sellingPrice && (
                            <span className="-strike">
                                {priceUnit}
                                {price}{' '}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

GridProductCard.propTypes = {
    itemData: PropTypes.object.isRequired
};

export default GridProductCard;
