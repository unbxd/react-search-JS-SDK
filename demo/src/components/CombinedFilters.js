import React from 'react';

import { CombinedFacets } from '@unbxd-ui/react-search-sdk';
import { FacetItemComponent as TextFacetItemComponent } from './TextFilters';
import { FacetItemComponent as RangeFacetItemComponent } from './RangeFilters';
import { FacetItemComponent as MultilevelFacetItemComponent } from './MultilevelFilters';
import { scrollTop } from '../utils';

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
            collapsible
            enableViewMore
            searchable
            multilevelFacetItemComponent={<MultilevelFacetItemComponent />}
            minViewMore={3}
            applyMultiple
            onFacetClick={onFacetClick}
        />
    );
};

export default CombinedFilters;
