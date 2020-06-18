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

const FacetItemComponent = ({ itemData, facetName }) => {
    const { name, count, dataId } = itemData;
    return (<p
        data-unx_name={facetName}
        data-unx_dataid={dataId}>
        {name} - {count}
    </p>)
}

const ActiveFacetItemComponent = ({ itemData, facetName }) => {
    const { name, dataId } = itemData;
    return (<p
        data-unx_name={facetName}
        data-unx_dataid={dataId}>
        {name} - X
    </p>)
}

const MultilevelFacetItemComponent = ({ itemData, multiLevelField, level, }) => {
    const { name, count } = itemData;
    return (<div
        data-unx_categoryname={name}
        data-unx_multilevelfield={multiLevelField}
        data-unx_level={level}
        className='UNX-bucketed-facet-list-item'
    >
        {name}---{count}
    </div>)
}

const BreadcrumbItemComponent = ({ itemData }) => {
    const { value, filterField, level } = itemData;
    return (<div
        data-unx_categoryname={value}
        data-unx_multilevelfield={filterField}
        data-unx_level={level}
        className={'UNX-breadcrumbs-list-item'}
    >
        {value}X
    </div>)
}

export const Facet = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets>
        <Facets.TextFacets />
    </Facets>

</UnbxdSearchWrapper >);

export const FacetsWithApplyAndClear = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        isApplyFilters={true}
        isClearFilters={true}
    >
        <Facets.TextFacets />
    </Facets>

</UnbxdSearchWrapper >);

export const FacetsWithMoveFacetsOnSelect = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        isApplyFilters={true}
        isClearFilters={true}
        moveFacetsOnSelect={true}>
        <Facets.TextFacets />
    </Facets>

</UnbxdSearchWrapper >);

export const FacetsWithDefaultFilters = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        defaultFilters={defaultFilters}>
        <Facets.TextFacets />
    </Facets>

</UnbxdSearchWrapper >);

export const FacetWithCustomFacetItemComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        FacetItemComponent={FacetItemComponent}
    />

</UnbxdSearchWrapper >);

export const FacetWithCustomActiveFacetItemComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        ActiveFacetItemComponent={ActiveFacetItemComponent}
        moveFacetsOnSelect={true}
    />

</UnbxdSearchWrapper >);

export const RangeFacets = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        isApplyFilters={true}
        isClearFilters={true}
        moveFacetsOnSelect={true}
    >
        <Facets.RangeFacets />
    </Facets>


</UnbxdSearchWrapper >);

export const MultilevelFacets = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        categoryDisplayName={'category'}
        categoryField={'categoryPath'}
    >
        <Facets.MultilevelFacets />
    </Facets>

</UnbxdSearchWrapper >);

export const MultilevelFacetsWithCustomComponents = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        categoryDisplayName={'category'}
        categoryField={'categoryPath'}
        MultilevelFacetItemComponent={MultilevelFacetItemComponent}
        BreadcrumbItemComponent={BreadcrumbItemComponent}
    >
        <Facets.MultilevelFacets />
    </Facets>

</UnbxdSearchWrapper >);
