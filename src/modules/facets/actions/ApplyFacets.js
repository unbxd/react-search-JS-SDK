import React from 'react';

import { FacetsContextConsumer } from '../context'
import { Button } from '../../../components'

const ApplyFacets = () => {
    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { isApplyFilters, noOfPages } = data;
            const { applyFilters } = helpers;

            if (!isApplyFilters) {
                return null
            }

            if (noOfPages === 0) {
                return null;
            }

            return (<Button className='UNX-facet-actions apply-filters' onClick={applyFilters}>
                Apply Facets
            </Button>)
        }}
    </FacetsContextConsumer>)
}

export default ApplyFacets;
