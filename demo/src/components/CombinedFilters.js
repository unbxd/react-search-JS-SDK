import React from 'react';

import { CombinedFacets } from '@unbxd-ui/react-search-sdk';
import { FacetItemComponent as TextFacetItemComponent } from './TextFilters';
import { FacetItemComponent as RangeFacetItemComponent } from './RangeFilters';

const transform = function () {
    console.log(this);
    return this;
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
            minViewMore={3}
            applyMultiple
        />
    );
};

export default CombinedFilters;
