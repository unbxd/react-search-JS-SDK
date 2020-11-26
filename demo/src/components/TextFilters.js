import React from 'react';

import { TextFacets } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

const transform = function () {
    console.log(this);
    return this;
};

export const FacetItemComponent = ({ itemData, onClick }) => {
    const { name, count, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <div
            className={`UNX-facet__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            <div className="-checkbox"></div>
            <div className="-label">{name}</div>
            <div className="-count">({count})</div>
        </div>
    );
};

const onFacetClick = (facet, isSelected) => {
    console.log('Facet change :', facet, isSelected);
    scrollTop();
    return true;
};

const TextFilters = () => {
    return (
        <TextFacets
            facetItemComponent={<FacetItemComponent />}
            collapsible={true}
            enableViewMore={true}
            searchable={true}
            transform={transform}
            minViewMore={3}
            //onFacetClick={onFacetClick}
        />
    );
};

export default TextFilters;
