import React from 'react';

import { CombinedFacets } from '@unbxd-ui/react-search-sdk';
import { FacetItemComponent as TextFacetItemComponent } from './TextFilters';
import { FacetItemComponent as RangeFacetItemComponent } from './RangeFilters';
import { FacetItemComponent as MultilevelFacetItemComponent } from './MultilevelFilters';

const transform = function () {
    console.log(this);
    return this;
};

const onFacetClick = (facet, facetType, isSelected) => {
    console.log('Facet change :', facet, facetType, isSelected);
    scrollTop();
    return true;
};

const CombinedFilters = () => {
    return (
        <CombinedFacets
            transform={transform}
            rangeFacetItemComponent={<RangeFacetItemComponent />}
            textFacetItemComponent={<TextFacetItemComponent />}
            multilevelFacetItemComponent={<MultilevelFacetItemComponent />}
            collapsible={true}
            enableViewMore={true}
            searchable={true}
            minViewMore={3}
            onFacetClick={onFacetClick}
        />
    );
};

export default CombinedFilters;
