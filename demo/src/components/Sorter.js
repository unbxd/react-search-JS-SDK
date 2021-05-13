import React from 'react';
import Select from 'react-select';
import { Sort } from '@unbxd-ui/react-search-sdk';

export const sortOptions = [
    {
        label: 'Most Relevant'
    },
    {
        label: 'Lowest Price',
        field: 'sortPrice',
        order: 'asc'
    },
    {
        label: 'Highest Price',
        field: 'sortPrice',
        order: 'desc'
    }
];

const label = (
    <div className="-label" htmlFor={'UNX-sortby__dropdown'}>
        Sort by
    </div>
);

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

const SortItemDropdownComponent = ({ sortOptions, noOfPages, onSortClick }) => {
    if (noOfPages === 0) {
        return null;
    }
    //find the selected option
    const selectedOption = sortOptions.find(
        (sortOption) => sortOption.isSelected
    );
    const handleChange = (selected) => {
        onSortClick(selected);
    };
    return (
        <div className="UNX-sortby__container">
            <label
                className="-label"
                id="UNX-sortby__dropdown-label"
                htmlFor="UNX-sortby__dropdown-input"
            >
                Sort By
            </label>
            <Select
                defaultValue={sortOptions[0]}
                options={sortOptions}
                value={selectedOption}
                onChange={handleChange}
                className="UNX-sort__dropdown UNX-dropdown-container"
                classNamePrefix="UNX-dropdown"
                aria-labelledby="UNX-sortby__dropdown-label"
                inputId="UNX-sortby__dropdown-input"
            />
        </div>
    );
};

// const Sorter = () => {
//     return (
//         <Sort
//             sortOptions={sortOptions}
//             label={label}
//             onSortChange={onSortChange}
//             // displayType={'LIST'}
//             // sortItemComponent={<SortItemComponent/>}
//         />
//     );
// };

const Sorter = () => {
    return (
        <Sort
            sortOptions={sortOptions}
            label={label}
            onSortChange={onSortChange}
        >
            {({ sortOptions, sortBy, noOfPages, onSortClick }) => {
                return (
                    <SortItemDropdownComponent
                        sortOptions={sortOptions}
                        sortBy={sortBy}
                        noOfPages={noOfPages}
                        onSortClick={onSortClick}
                    />
                );
            }}
        </Sort>
    );
};

export default Sorter;
