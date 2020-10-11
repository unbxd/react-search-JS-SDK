import React from 'react';

import { MultilevelFacets } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

const FacetItemComponent = ({ itemData, multiLevelField, onClick }) => {
    const { name, count, level, isSelected } = itemData;
    return (
        <div
            className={`UNX-facet__item l${level} ${
                isSelected ? 'selected' : ''
            }`}
            data-unx_categoryname={name}
            data-unx_multilevelfield={multiLevelField}
            data-unx_level={level}
            onClick={onClick}
        >
            <div
                className="-checkbox"
                data-unx_categoryname={name}
                data-unx_multilevelfield={multiLevelField}
                data-unx_level={level}
            ></div>
            <div
                className="-label"
                data-unx_categoryname={name}
                data-unx_multilevelfield={multiLevelField}
                data-unx_level={level}
            >
                {name}
            </div>
            {count && (
                <div
                    className="-count"
                    data-unx_categoryname={name}
                    data-unx_multilevelfield={multiLevelField}
                    data-unx_level={level}
                >
                    ({count})
                </div>
            )}
        </div>
    );
};

const onFacetClick = (facet) => {
    console.log('Facet change :', facet);
    scrollTop();
    return true;
};
const label = <div className="UNX-searchFacet__mainHeader">Filter By</div>;
const MultilevelFilters = ({ showLabel = true }) => {
    return (
        <MultilevelFacets
            categoryDisplayName={'category'}
            categoryField={'categoryPath'}
            collapsible={true}
            searchable={true}
            FacetItemComponent={FacetItemComponent}
            label={showLabel ? label : undefined}
            //onFacetClick={onFacetClick}
        />
    );
};

export default MultilevelFilters;
