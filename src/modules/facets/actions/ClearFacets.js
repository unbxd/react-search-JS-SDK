import React from 'react';

import { FacetsContextConsumer } from '../context'
import { Button } from '../../../components'

const ClearFacets = () => {
    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { isClearFilters } = data;
            const { clearFilters } = helpers;

            if (!isClearFilters) {
                return null
            }

            return (<Button className='UNX-facet-actions clear-filters' onClick={clearFilters}>
                Clear Facets
            </Button>)
        }}
    </FacetsContextConsumer>)
}

export default ClearFacets;
