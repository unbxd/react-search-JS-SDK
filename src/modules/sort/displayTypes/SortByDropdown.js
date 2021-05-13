import React from 'react';
import PropTypes from 'prop-types';

const SortByDropdown = ({ sortBy, sortByOptions, onSortClick }) => {
    return (
        <select
            name="sortby"
            id="UNX-sortby__dropdown"
            className="UNX-sortby__dropdown"
            value={sortBy.value}
            onChange={onSortClick}
            data-testid="UNX_unbxdSorter"
        >
            {sortByOptions.map((item) => (
                <option
                    value={item.value}
                    data-testid={item.value.split('|').join(' ')}
                    key={item.value}
                    className="UNX-dropdown__option"
                >
                    {item.label}
                </option>
            ))}
        </select>
    );
};

SortByDropdown.propTypes = {
    sortBy: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string,
        order: PropTypes.string,
        value: PropTypes.string
    }),
    sortByOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            order: PropTypes.string
        })
    ).isRequired,
    onSortClick: PropTypes.func.isRequired
};

export default SortByDropdown;
