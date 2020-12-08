import React, { useState, useEffect } from 'react';

import { RangeFacets } from '@unbxd-ui/react-search-sdk';
import { RangeSlider } from '../common/components';
import { scrollTop } from '../utils';

const RangeFacetsRender = (props) => {
    const { rangeFacets, addRangeFacet, applyRangeFacet } = props;
    const [rangeValues, setRangeValues] = useState(rangeFacets);

    useEffect(() => {
        setRangeValues(rangeFacets);
    }, [rangeFacets]);

    function handleSliderChange(facetName, values) {
        const [valMin, valMax] = values;
        const updatedRangeValues = rangeValues.map((facet) => {
            if (facetName === facet.facetName) {
                return { ...facet, rangeMin: valMin, rangeMax: valMax };
            }
        });
        setRangeValues(updatedRangeValues);
        addRangeFacet({
            facetName,
            start: valMin,
            end: valMax
        });
        // don't call in case of apply
        // applyRangeFacet();
        // scrollTop();
    }

    return (
        <div>
            {rangeValues.map((facet) => {
                const {
                    facetName,
                    displayName,
                    sliderMin,
                    sliderMax,
                    rangeMin,
                    rangeMax
                } = facet;
                const onChangeHandler = handleSliderChange.bind(
                    null,
                    facetName
                );
                return (
                    <div className="UNX-rangeFacet__container">
                        <div className="UNX-facet__element rangeSlider">
                            <div
                                className="UNX-facet__header"
                                data-unx_name={facetName}
                            >
                                {displayName}
                            </div>
                            <RangeSlider
                                min={sliderMin}
                                max={sliderMax}
                                value={[rangeMin, rangeMax]}
                                handleAfterChange={onChangeHandler}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const FacetItemComponent = ({ itemData, onClick, priceUnit }) => {
    const { from, end, facetName, isSelected = false } = itemData;
    const { name: fromName, count, dataId: fromDataId } = from;
    const { name: ToName, dataId: toDataId } = end;

    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <div
            key={`${facetName}_${fromDataId}-${toDataId}`}
            className={`UNX-facet__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            <div className="-checkbox" />
            <div className="-label">
                {priceUnit}
                {fromName} - {priceUnit}
                {ToName}
            </div>
            <div className="-count">({count})</div>
        </div>
    );
};

const transform = function () {
    console.log(this);
    return this;
};

export const RangeFiltersRenderProps = () => {
    return (
        <RangeFacets>{(props) => <RangeFacetsRender {...props} />}</RangeFacets>
    );
};

const onFacetClick = (facetObj, eventType) => {
    console.log('Facet change :', facetObj, eventType);
    if (eventType === 'CLEAR') {
        scrollTop();
    }
    return true;
};

const RangeFilters = () => {
    return (
        <RangeFacets
            transform={transform}
            facetItemComponent={<FacetItemComponent />}
            collapsible
            enableViewMore
            minViewMore={3}
            applyMultiple
            onFacetClick={onFacetClick}
        />
    );
};

export default RangeFilters;
