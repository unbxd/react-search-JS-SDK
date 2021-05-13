/* eslint-disable react/prop-types */
import React from 'react';

import { SelectedFacets } from '@unbxd-ui/react-search-sdk';

export const FacetItemComponent = ({ itemData, onClick, priceUnit }) => {
    const { name, type, dataId, facetName } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };

    let selectedFacetMarkup = null;
    let facetVal = dataId;
    if (type === 'TEXT_FACET') {
        selectedFacetMarkup = <span>{name}</span>;
    }
    if (type === 'RANGE_FACET') {
        const [valMin, valMax] = dataId.split(' TO ');
        facetVal = `[${valMin}-${valMax}]`;
        selectedFacetMarkup = (
            <span>
                {priceUnit} {valMin} - {priceUnit} {valMax}
            </span>
        );
    }

    return (
        <div
            className="UNX-selectedFacets__item"
            onClick={handleClick}
            data-facet-name={facetName}
            data-id={facetVal}
            tabIndex={0}
            role={'button'}
        >
            {selectedFacetMarkup} <span className="-cross" />
        </div>
    );
};

const label = <div className="-label">Selected Filters</div>;

const ActiveFilters = () => {
    return (
        <SelectedFacets
            facetItemComponent={<FacetItemComponent />}
            label={label}
        />
    );
};

export default ActiveFilters;
