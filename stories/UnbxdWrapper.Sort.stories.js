import React from 'react';

import UnbxdSearchWrapper from '../src/App';
import Sort from '../src/modules/sort';

export default {
    title: 'UnbxdSearchWrapper'
}

const MyListComponent = ({ itemData, onClick, isActive }) => {

    return (<div data-unxsortby={itemData.value}>{itemData.label}</div>)
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

export const UnbxdSearchWrapperSortComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Sort
        defaultSort={{
            "label": "Brand Z-A",
            "field": "title",
            "order": "desc"
        }}
        sortOptions={sortOptions}
        sortDisplayType={'LIST'}
        SortListComponent={MyListComponent} />

</UnbxdSearchWrapper >)  
