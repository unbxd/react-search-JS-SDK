import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Facets from '../src/modules/facets';
import SearchBox from '../src/modules/searchBox';


const stories = storiesOf('Facets', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper,
            'TextFacets',
            'RangeFacets',
            'MultilevelFacets',
            'ApplyFacets',
            'ClearFacets',
        ]
    }
});

const defaultSearch = 'Boots';

const defaultFilters = {
    brand_uFilter: 'The North Face'
}

const FacetItemComponent = ({ itemData, facetName, onClick, isFacetSelected, selectedFacets }) => {

    const { name, count, dataId } = itemData;
    const isSelected = isFacetSelected(selectedFacets, facetName, dataId);

    return (<div>
        <input
            type="checkbox"
            checked={isSelected}
            data-unx_name={facetName}
            data-unx_dataid={dataId}
            onClick={onClick} />

        {name} - {count}
    </div>)
}

const SelectedFacetItemComponent = ({ itemData, facetName, onClick }) => {
    const { name, dataId } = itemData;
    return (<p
        data-unx_name={facetName}
        data-unx_dataid={dataId}
        onClick={onClick}>
        {name}  x
    </p>)
}

const MultilevelFacetItemComponent = ({ itemData, multiLevelField, level, onClick }) => {
    const { name, count } = itemData;
    return (<div
        data-unx_categoryname={name}
        data-unx_multilevelfield={multiLevelField}
        data-unx_level={level}
        className='UNX-bucketed-facet-list-item'
        onClick={onClick}
    >
        {name} - {count}
    </div>)
}

const BreadcrumbItemComponent = ({ itemData, onClick }) => {
    const { value, filterField, level } = itemData;
    return (<div
        data-unx_categoryname={value}
        data-unx_multilevelfield={filterField}
        data-unx_level={level}
        className={'UNX-breadcrumbs-list-item'}
        onClick={onClick}
    >
        {value} x
    </div>)
}

stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        categoryDisplayName={'category'}
        categoryField={'categoryPath'} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with default filters', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        defaultFilters={defaultFilters} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with text facets', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets>
        <Facets.TextFacets />
    </Facets>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with applyFilters and clearFilters', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        isApplyFilters={true}
        isClearFilters={true} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with moveFacetsOnSelect', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        moveFacetsOnSelect={true} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with FacetItemComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        FacetItemComponent={FacetItemComponent} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with SelectedFacetItemComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        SelectedFacetItemComponent={SelectedFacetItemComponent}
        moveFacetsOnSelect={true}
    />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with range facet', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets>
        <Facets.RangeFacets />
    </Facets>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with multilevel facet', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        categoryDisplayName={'category'}
        categoryField={'categoryPath'}
    >
        <Facets.MultilevelFacets />
    </Facets>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with MultilevelFacetItemComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        categoryDisplayName={'category'}
        categoryField={'categoryPath'}
        MultilevelFacetItemComponent={MultilevelFacetItemComponent}
    >
        <Facets.MultilevelFacets />
    </Facets>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with BreadcrumbItemComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        categoryDisplayName={'category'}
        categoryField={'categoryPath'}
        BreadcrumbItemComponent={BreadcrumbItemComponent}
    >
        <Facets.MultilevelFacets />
    </Facets>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with more flexibility', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        categoryDisplayName={'category'}
        categoryField={'categoryPath'}>
        <Facets.TextFacets />
        <Facets.ApplyFacets />
        <Facets.ClearFacets />
        <Facets.RangeFacets />
        <Facets.MultilevelFacets />
    </Facets>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Facets
        categoryDisplayName={'category'}
        categoryField={'categoryPath'}
        MultilevelFacetItemComponent={MultilevelFacetItemComponent}
        BreadcrumbItemComponent={BreadcrumbItemComponent}
    >
        {({ data, helpers }) => {
            //data and helpers for Facets
            return (<div>Hello from Facets</div>)
        }}
    </Facets>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));