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
            RangeFacetItemComponent={RangeFacetItemComponent}
            TextFacetItemComponent={TextFacetItemComponent}
            collapsible={true}
            enableViewMore={true}
            searchable={true}
            minViewMore={3}
        />
    );
};

export default CombinedFilters;
