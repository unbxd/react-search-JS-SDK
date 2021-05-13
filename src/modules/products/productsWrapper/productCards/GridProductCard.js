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

    onSwatchClick = (currentSwatchId) => {
        this.setState((currentState) => {
            return {
                productValues: {
                    ...currentState.productValues,
                    swatches: currentState.productValues.swatches.map(
                        (swatchObject) => {
                            if (
                                swatchObject.uniqueId ===
                                currentSwatchId.uniqueId
                            ) {
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
        const {
            swatchItemComponent,
            itemData,
            onClick,
            priceUnit,
            variantAttributesMap,
            showSwatches
        } = this.props;
        const { productValues } = this.state;
        const { swatches = [], variants = [] } = productValues;
        const activeSwatch = swatches.find((swatch) => {
            return swatch.isSelected;
        });
        let activeVariant = {};
        if (showSwatches) {
            activeVariant = variants.find((variant) => {
                return (
                    variant[variantAttributesMap['uniqueId']] ===
                    activeSwatch.uniqueId
                );
            });
        }

        const handleClick = () => {
            onClick(itemData);
        };

        const product = { ...productValues, ...activeVariant };
        const { title, imageUrl, productUrl, price, sellingPrice } = product;

        return (
            <div className="UNX-productCard__container">
                <a
                    href={productUrl}
                    className={`UNX-product-card UNX-grid-card`}
                    onClick={handleClick}
                >
                    <img className="-image" src={imageUrl} alt={title} />
                </a>

                <div className="UNX-swatch__container">
                    {swatches.length > 1 ? (
                        <List
                            items={swatches}
                            ListItem={swatchItemComponent || SwatchItem}
                            idAttribute={'swatchId'}
                            onClick={this.onSwatchClick}
                            className="UNX-swatch__list"
                        />
                    ) : null}
                </div>
                <div className={'-details'}>
                    <div className="-title">{title}</div>

                    <div className="-price">
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
