import React from 'react';

import { Sort } from '@unbxd-ui/react-search-sdk';

export const sortOptions = [
    {
        label: 'Most Relevant'
    },
    {
        label: 'Lowest Price',
        field: 'PRODUCT_PRICE',
        order: 'asc'
    },
    {
        label: 'Highest Price',
        field: 'PRODUCT_PRICE',
        order: 'desc'
    }
];
const label = <div className="-label">Sort by</div>;
const onSortChange = (field, order) => {
    console.log('Sort change: ', field, order);
    return true;
};

export const SortItemComponent = ({ itemData, onClick }) => {
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
