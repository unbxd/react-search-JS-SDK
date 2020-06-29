import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Sort from '../src/modules/sort';

export default {
    title: 'Sort',
    component: Sort
}

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

export const SortComponent = () => (<UnbxdSearchWrapper
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

</UnbxdSearchWrapper >);

export const SortDropdownComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Sort
        defaultSort={{
            "label": "Brand A-Z",
            "field": "title",
            "order": "asc"
        }}
        sortOptions={sortOptions}
        sortDisplayType={'DROPDOWN'}
        SortItemComponent={SortItemComponent} />

</UnbxdSearchWrapper >);

export const SortRenderProps = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Sort
        sortOptions={sortOptions}
    >
        {({ data, helpers }) => {
            //data and helpers for Sort
            return (<p>Hello from Sort</p>)
        }}
    </Sort>

</UnbxdSearchWrapper >);  
