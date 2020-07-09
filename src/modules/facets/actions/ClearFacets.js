import React from 'react';

import { FacetsContextConsumer } from '../context'
import { Button } from '../../../components'

const ClearFacets = () => {
    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { isClearFilters, noOfPages } = data;
            const { clearFilters } = helpers;

            if (!isClearFilters) {
                return null
            }

            if (noOfPages === 0) {
                return null;
            }

            return (<Button className='UNX-facet__action  -clearFilters' onClick={clearFilters}>
                Clear Facets
            </Button>)
        }}
    </FacetsContextConsumer>)
}

export default ClearFacets;
