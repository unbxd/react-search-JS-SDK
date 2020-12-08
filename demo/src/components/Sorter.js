import React from 'react';

import { Sort } from '@unbxd-ui/react-search-sdk';

const sortOptions = [
    {
        label: 'Most Relevant'
    },
    {
        label: 'Newest',
        field: 'Date_Added',
        order: 'desc'
    },
    {
        label: 'Lowest Price',
        field: 'price',
        order: 'asc'
    },
    {
        label: 'Highest Price',
        field: 'price',
        order: 'desc'
    },
    {
        label: 'Brand A-Z',
        field: 'title',
        order: 'asc'
    },
    {
        label: 'Brand Z-A',
        field: 'title',
        order: 'desc'
    }
];
const label = <div className="-label">Sort by</div>;
const onSortChange = (field, order) => {
    console.log('Sort change: ', field, order);
    return true;
};

const SortItemComponent = ({ itemData, onClick }) => {
    const { value, isSelected = false } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <button
            className={`UNX-sortby__item ${isSelected ? '-selected' : ''}`}
            data-testid={value.split('|').join(' ')}
            onClick={handleClick}
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
            onSortChange={onSortChange}
            // displayType={'LIST'}
            // sortItemComponent={<SortItemComponent/>}
        />
    );
};

export default Sorter;
