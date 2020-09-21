import React from 'react';

import { Sort } from '@unbxd-ui/react-search-sdk';


const sortOptions = [
    {
        "label": "Most Relevant"
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
const label = <div className='-label'>Sort by</div>
const Sorter = () => {
        return (<Sort sortOptions={sortOptions} label={label} />)
}

export default Sorter;
