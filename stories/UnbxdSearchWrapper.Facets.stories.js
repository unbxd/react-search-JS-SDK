import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Facets from '../src/modules/facets';

export default {
    title: 'Facets',
    component: Facets
}

const defaultFilters = {
    brand_uFilter: 'The North Face'
}

export const Facet = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets />

</UnbxdSearchWrapper >);

export const FacetsWithApplyAndClear = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        isApplyFilters={true}
        isClearFilters={true}
    />

</UnbxdSearchWrapper >);

export const FacetsWithMoveFacetsOnSelect = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        isApplyFilters={true}
        isClearFilters={true}
        moveFacetsOnSelect={true}
    />

</UnbxdSearchWrapper >);

export const FacetsWithDefaultFilters = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        defaultFilters={defaultFilters}
    />

</UnbxdSearchWrapper >);