import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Sort from '../src/modules/sort';

const stories = storiesOf('Sort', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper,
            'SortBy',
            'ResetSort']
    }
});

const SortItemComponent = ({ itemData, isActive }) => {

    return (<div
        data-unxsortby={itemData.value}
        className={`sort-item ${isActive ? 'active' : ''}`}
    >
        {itemData.label}
    </div>)
}

const sortOptions = [
    {
        "label": "Most Popular"
    },
    {
        "label": "Newest",
        "field": "Date_Added",
        "order": "desc"
    },
    {
        "label": "Lowest Price",
        "field": "price",
        "order": "asc"
    },
    {
        "label": "Highest Price",
        "field": "price",
        "order": "desc"
    },
    {
        "label": "Brand A-Z",
        "field": "title",
        "order": "asc"
    },
    {
        "label": "Brand Z-A",
        "field": "title",
        "order": "desc"
    }
]

stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Sort sortOptions={sortOptions} />

</UnbxdSearchWrapper >));

stories.add('with defaultSort', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Sort
        defaultSort={{
            "label": "Brand A-Z",
            "field": "title",
            "order": "asc"
        }}
        sortOptions={sortOptions} />

</UnbxdSearchWrapper >));

stories.add('with sortDisplayType List', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Sort
        defaultSort={{
            "label": "Brand A-Z",
            "field": "title",
            "order": "asc"
        }}
        sortOptions={sortOptions}
        sortDisplayType={'LIST'}
        SortItemComponent={SortItemComponent} />

</UnbxdSearchWrapper >));

stories.add('with more flexibility', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Sort
        defaultSort={{
            "label": "Brand A-Z",
            "field": "title",
            "order": "asc"
        }}
        sortOptions={sortOptions}
    >

        <Sort.SortBy />
        <Sort.ResetSort />

    </Sort>

</UnbxdSearchWrapper >));

stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Sort
        sortOptions={sortOptions}
    >
        {({ data, helpers }) => {

            //data and helpers for Sort
            return (<p>Hello Sort</p>)
        }}
    </Sort>

</UnbxdSearchWrapper >));  
