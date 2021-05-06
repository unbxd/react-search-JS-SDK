import React, { useState, useContext } from 'react';

import { Products } from '@unbxd-ui/react-search-sdk';
import { ProductTypeContext } from '../context';

const attributesMap = {
    productName: 'title',
    uniqueId: 'uniqueId',
    imageUrl: 'productImage',
    sellingPrice: 'sortPrice',
    productUrl: 'productUrl'
};

const variantAttributesMap = {
    productName: 'v_title',
    uniqueId: 'vId',
    imageUrl: 'imageUrl',
    price: 'v_RRP_Price',
    sellingPrice: 'v_unbxd_price',
    productUrl: 'productUrl'
};

const swatchAttributesMap = {
    swatchId: 'variantId',
    swatchImageUrl: 'variant_overhead_swatch',
    imageUrl: 'variant_image_array',
    price: 'variant_cheapest_default_price',
    sellingPrice: 'variant_min_cheapest_msrp',
    productUrl: 'variant_productUrl'
};

export const SwatchItemComponent = ({ itemData, onClick }) => {
    const { swatchImageUrl, swatchId, isSelected } = itemData;
    return (
        <div
            className={`UNX-swatch__item ${isSelected ? '-selected' : ''}`}
            data-variant_id={swatchId}
            onClick={onClick}
        >
            <img
                data-variant_id={swatchId}
                src={swatchImageUrl}
                className="-image"
            />
        </div>
    );
};

export const ProductItemComponent = (props) => {
    const { itemData, idAttribute, onClick, idx, showSwatches } = props;

    const getParsedProduct = ({ itemData, idAttribute }) => {
        const { imageUrl, title, productUrl, variants } = itemData;
        const swatchValues = variants.map((variant, index) => {
            return {
                swatchId: variant.variantId,
                imageUrl: variant.v_imageUrl,
                swatchImageUrl: variant.v_swatchUrl,
                active: index === 0 ? true : false
            };
        });
        const productValues = {
            idAttribute,
            imageUrl,
            title,
            productUrl,
            swatchValues
        };
        return productValues;
    };

    const handleSwatchClick = (event) => {
        const currentSwatchId = event.target.dataset['swatchid'];
        const updatedSwatches = productValues.swatchValues.map((swatch) => {
            if (swatch.swatchId === currentSwatchId) {
                return { ...swatch, active: true };
            } else {
                return { ...swatch, active: false };
            }
        });
        setProductValues({ ...productValues, swatchValues: updatedSwatches });
    };

    const [productValues, setProductValues] = useState(
        getParsedProduct({ itemData, idAttribute })
    );

    const [activeSwatch] = productValues['swatchValues'].filter((swatch) => {
        return swatch.active;
    });
    const product = { ...productValues, ...activeSwatch };
    const { imageUrl, title, productUrl, swatchValues } = product;
    const uniqueId = idAttribute;
    const prank = idx + 1;
    return (
        <div className="UNX-productCard__container">
            <div
                className="details"
                data-uniqueid={uniqueId}
                data-prank={prank}
                onClick={onClick}
            >
                <a
                    href={productUrl}
                    data-uniqueid={uniqueId}
                    data-prank={prank}
                >
                    <img
                        className="-image"
                        src={imageUrl}
                        data-uniqueid={uniqueId}
                        data-prank={prank}
                    />
                </a>
                <div
                    className="-title"
                    data-uniqueid={uniqueId}
                    data-prank={prank}
                >
                    {title}
                </div>
            </div>
            {showSwatches && (
                <div className="UNX-swatch__list">
                    {swatchValues.map((swatch) => {
                        const { swatchImageUrl, swatchId } = swatch;
                        return (
                            <img
                                className="-image"
                                src={swatchImageUrl}
                                data-swatchid={swatchId}
                                onClick={handleSwatchClick}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const ProductsListing = () => {
    const { setEnableFilters } = useContext(ProductTypeContext);
    const onZeroResults = () => {
        setEnableFilters(false);
    };
    return (
        <Products
            attributesMap={attributesMap}
            pageSize={10}
            showVariants={false}
            variantsCount={4}
            variantAttributesMap={variantAttributesMap}
            showSwatches={false}
            swatchAttributesMap={swatchAttributesMap}
            paginationType="FIXED_PAGINATION"
            onZeroResults={onZeroResults}
        />
    );
};

export default ProductsListing;
