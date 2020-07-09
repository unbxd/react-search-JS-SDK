import React from 'react';

import { Sort } from '@unbxd-ui/react-search-sdk';


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

const Sorter = () => {
    return (<div className='UNX-sort__container'>
        <div className='-label'>Sort by</div>
        <Sort sortOptions={sortOptions} />
    </div>)
}

export default Sorter;
