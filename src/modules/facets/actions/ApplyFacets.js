import React from 'react';

import { FacetsContextConsumer } from '../context'
import { Button } from '../../../components'

const ApplyFacets = () => {
    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { isApplyFilters } = data;
            const { applyFilters } = helpers;

            if (!isApplyFilters) {
                return null
            }

            return (<Button className='UNX-facet-actions apply-filters' onClick={applyFilters}>
                Apply Facets
            </Button>)
        }}
    </FacetsContextConsumer>)
}

export default ApplyFacets;
