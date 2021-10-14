import React, { useState, useContext, useEffect } from 'react';

import { Products } from '../../../src/index';
import { ProductTypeContext } from '../context';

const attributesMap = {
    title: 'title',
    uniqueId: 'uniqueId',
    imageUrl: 'productImage',
    sellingPrice: 'sortPrice',
    productUrl: 'productUrl',
    unbxd_color_mapping: 'unbxd_color_mapping'
};

const variantAttributesMap = {
    title: 'title',
    uniqueId: 'variantId',
    imageUrl: 'imageUrl',
    sellingPrice: 'min_price',
    productUrl: 'productUrl'
};

const swatchAttributesMap = {
    swatchImageUrl: 'v_swatchUrl',
    color: 'v_StandardColor1',
    size: 'v_Size1'
};

export const SwatchItemComponent = ({ itemData, onClick }) => {
    const { swatchImageUrl, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <div
            className={`UNX-swatch__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            <img src={swatchImageUrl} className="-image" />
        </div>
    );
};

export const ProductItemComponent = (props) => {
    const { itemData, priceUnit, onClick } = props;
    const {
        imageUrl,
        title,
        price,
        sellingPrice,
        productUrl,
        unbxd_color_mapping = []
    } = itemData;
    const formattedSwatches = {};
    let firstSwatch = null;
    if (unbxd_color_mapping.length > 1) {
        for (const colorMapStr of unbxd_color_mapping) {
            const [color, swatchImageUrl] = colorMapStr.split('::');
            formattedSwatches[color] = { color, swatchImageUrl };
        }
        firstSwatch = unbxd_color_mapping[0].split('::')[0];
    }

    const [currentImageUrl, setCurrentUrl] = useState(
        firstSwatch
            ? formattedSwatches[firstSwatch]['swatchImageUrl']
            : imageUrl
    );

    const handleClick = () => {
        onClick(itemData);
    };

    const handleSwatchClick = (color) => {
        setCurrentUrl(formattedSwatches[color]['swatchImageUrl']);
    };

    let swatchMarkup = null;
    if (Object.keys(formattedSwatches).length > 1) {
        swatchMarkup = Object.keys(formattedSwatches).map((swatchColor) => {
            const { color, swatchImageUrl } = formattedSwatches[swatchColor];
            const bindedOnClick = handleSwatchClick.bind(null, color);
            return (
                <div
                    className="UNX-swatch__item"
                    title={color}
                    onClick={bindedOnClick}
                >
                    <img src={swatchImageUrl} alt={title} />
                </div>
            );
        });
    }

    return (
        <div className="UNX-productCard__container">
            <div className="details" onClick={handleClick}>
                <a href={productUrl}>
                    <img className="-image" src={currentImageUrl} alt={title} />
                </a>
                <div className="-swatch__container">{swatchMarkup}</div>
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
};

const ViewMore = (props) => {
    const { moreCount, isOpen, onClick } = props;
    const handleClick = () => {
        onClick(!isOpen);
    };
    return (
        <div className="viewMore__container">
            {isOpen ? (
                <div className="-close" onClick={handleClick}>
                    -
                </div>
            ) : (
                <div className="-open" onClick={handleClick}>
                    +{moreCount}
                </div>
            )}
        </div>
    );
};

const SwatchProductItemComponent = (props) => {
    const { itemData, priceUnit, onClick } = props;
    const {
        imageUrl,
        title,
        price,
        sellingPrice,
        productUrl,
        swatches
    } = itemData;
    const MAX_SWATCH_LENGTH = 2;
    const [isColorSwatchOpen, setColorSwatchOpen] = useState(false);
    const [isSizeSwatchOpen, setSizeSwatchOpen] = useState(false);

    const colorSwatchesMap = {};
    swatches.forEach((variant, idx) => {
        const { color, swatchImageUrl, uniqueId } = variant;
        let isSelected = false;
        if (idx === 0) {
            isSelected = true;
        }
        if (!colorSwatchesMap[color]) {
            colorSwatchesMap[color] = {
                color,
                swatchImageUrl,
                uniqueId,
                isSelected
            };
        }
    });
    const [colorSwatch, setColorSwatch] = useState(
        Object.values(colorSwatchesMap)
    );

    const sizeSwatchesMap = {};
    swatches.forEach((variant) => {
        const { size, color, uniqueId } = variant;
        if (!sizeSwatchesMap[color]) {
            sizeSwatchesMap[color] = {
                color,
                uniqueId,
                list: []
            };
            const sizeSwatchItem = {
                size,
                color,
                uniqueId
            };
            sizeSwatchesMap[color]['list'].push(sizeSwatchItem);
        } else {
            const sizeSwatchItem = {
                size,
                color,
                uniqueId
            };
            sizeSwatchesMap[color]['list'].push(sizeSwatchItem);
        }
    });
    const [sizeSwatch, setSizeSwatch] = useState(
        Object.values(sizeSwatchesMap)
    );

    const handleClick = () => {
        onClick(itemData);
    };

    const handleColorSwatchClick = (currentSwatch) => {
        const { color } = currentSwatch;
        const updatedColorSwatch = colorSwatch.map((swatch) => {
            if (swatch.color === color) {
                return {
                    ...swatch,
                    isSelected: true
                };
            } else {
                return {
                    ...swatch,
                    isSelected: false
                };
            }
        });
        setColorSwatch(updatedColorSwatch);
    };

    const activeColorSwatch = colorSwatch.find((swatch) => swatch.isSelected);
    const handleSizeSwatchClick = (currentSwatch) => {
        const { size } = currentSwatch;

        const filteredSizeSwatches = sizeSwatch.filter(
            (swatch) => swatch.color !== activeColorSwatch.color
        );
        const currentSizeSwatch = sizeSwatch.find(
            (swatch) => swatch.color === activeColorSwatch.color
        );
        const list = currentSizeSwatch.list.map((swatchItem) => {
            if (swatchItem.size === size) {
                return { ...swatchItem, isSelected: true };
            } else {
                return { ...swatchItem, isSelected: false };
            }
        });
        setSizeSwatch([
            ...filteredSizeSwatches,
            { ...currentSizeSwatch, list }
        ]);
    };

    const currentColorSwatchLength = Object.keys(colorSwatch).length;
    const colorSwatchMore =
        currentColorSwatchLength > MAX_SWATCH_LENGTH
            ? currentColorSwatchLength - MAX_SWATCH_LENGTH
            : 0;
    const colorSliceIdx = isColorSwatchOpen
        ? currentColorSwatchLength
        : MAX_SWATCH_LENGTH;

    const colorSwatchMarkup = colorSwatch
        .slice(0, colorSliceIdx)
        .map((swatch) => {
            const { swatchImageUrl, color, isSelected } = swatch;
            const handleClick = handleColorSwatchClick.bind(null, swatch);
            return (
                <img
                    src={swatchImageUrl}
                    alt={`${color} image`}
                    className={`UNX-swatch__item ${
                        isSelected ? '-selected' : ''
                    }`}
                    onClick={handleClick}
                    key={`${swatchImageUrl}_${color}`}
                />
            );
        });

    const activeSizeSwatch = sizeSwatch.find(
        (swatch) => swatch.color === activeColorSwatch.color
    );

    let sizeSwatchMarkup = null;
    let sizeSwatchMore = 0;
    if (activeSizeSwatch) {
        const currentSizeSwatchLength = activeSizeSwatch.list.length;
        sizeSwatchMore =
            activeSizeSwatch.list.length > MAX_SWATCH_LENGTH
                ? currentSizeSwatchLength - MAX_SWATCH_LENGTH
                : 0;

        const sliceIdx = isSizeSwatchOpen
            ? currentSizeSwatchLength
            : MAX_SWATCH_LENGTH;
        sizeSwatchMarkup = activeSizeSwatch.list
            .slice(0, sliceIdx)
            .map((swatch) => {
                const { size, color, isSelected, isDisabled } = swatch;
                const handleClick = handleSizeSwatchClick.bind(null, swatch);
                return (
                    <div
                        className={`UNX-swatch__item ${
                            isSelected ? '-selected' : ''
                        } ${isDisabled ? '-disabled' : ''}`}
                        onClick={handleClick}
                        key={`${size}_${color}`}
                    >
                        {size}
                    </div>
                );
            });
    }

    return (
        <div className="UNX-productCard__container">
            <div className="details" onClick={handleClick}>
                <a href={productUrl}>
                    <img className="-image" src={imageUrl} alt={title} />
                </a>
                <div className="-swatch__container -multiple">
                    <div
                        className={`-color__container ${
                            isColorSwatchOpen ? '-open' : ''
                        }`}
                    >
                        <div className="-swatch__list">{colorSwatchMarkup}</div>
                        {colorSwatchMore > 0 && (
                            <ViewMore
                                moreCount={colorSwatchMore}
                                isOpen={isColorSwatchOpen}
                                onClick={setColorSwatchOpen}
                            />
                        )}
                    </div>
                    <div
                        className={`-size__container ${
                            isSizeSwatchOpen ? '-open' : ''
                        }`}
                    >
                        <div className="-swatch__list">{sizeSwatchMarkup}</div>
                        {sizeSwatchMore > 0 && (
                            <ViewMore
                                moreCount={sizeSwatchMore}
                                isOpen={isSizeSwatchOpen}
                                onClick={setSizeSwatchOpen}
                            />
                        )}
                    </div>
                </div>
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
};

const ZeroResultsComponent = ({ query }) => {
    const { setEnableFilters } = useContext(ProductTypeContext);
    useEffect(() => {
        setEnableFilters(false);
    }, [query]);
    return <div>No products found.</div>;
};

const ProductsListing = () => {
    return (
        <Products
            attributesMap={attributesMap}
            pageSize={10}
            showVariants={false}
            variantsCount={10}
            variantAttributesMap={variantAttributesMap}
            showSwatches={false}
            swatchAttributesMap={swatchAttributesMap}
            //groupBy="v_StandardColor1"
            paginationType="FIXED_PAGINATION"
            zeroResultsComponent={<ZeroResultsComponent />}
            productItemComponent={<ProductItemComponent />}
            //productItemComponent={<SwatchProductItemComponent />}
            //swatchItemComponent={<SwatchItemComponent />}
        />
    );
};

export default ProductsListing;
