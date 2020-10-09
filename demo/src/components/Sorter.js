import React from 'react';

import { Sort } from '@unbxd-ui/react-search-sdk';

const sortOptions = [
    {
        label: 'Most Relevant',
    },
    {
        label: 'Newest',
        field: 'Date_Added',
        order: 'desc',
    },
    {
        label: 'Lowest Price',
        field: 'price',
        order: 'asc',
    },
    {
        label: 'Highest Price',
        field: 'price',
        order: 'desc',
    },
    {
        label: 'Brand A-Z',
        field: 'title',
        order: 'asc',
    },
    {
        label: 'Brand Z-A',
        field: 'title',
        order: 'desc',
    },
];
const label = <div className="-label">Sort by</div>;
// const Sorter = () => {
//         return (<Sort sortOptions={sortOptions} label={label} />)
// }

const SortItemComponent = ({ itemData, onClick }) => {
    const { value, isSelected = false } = itemData;
    return (
        <button
            data-unxsortby={value}
            className={`UNX-sortby__item ${isSelected ? '-selected' : ''}`}
            data-testid={value.split('|').join(' ')}
            onClick={onClick}
        >
            {itemData.label}
        </button>
    );
};
const Sorter = () => {
    return (
        <Sort
            sortOptions={sortOptions}
            label={label}
            //displayType={'LIST'}
            //defaultSort={sortOptions[1]}
            //SortItemComponent={SortItemComponent}
        />
    );
};

export default Sorter;
