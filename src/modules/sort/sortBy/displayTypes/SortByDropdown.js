import React from 'react';
import PropTypes from 'prop-types';

const SortByDropdown = ({ sortBy, sortByOptions, onSortClick }) => {

    return (
        <select name="sortby"
            className="UBX-sortby-dropdown"
            value={sortBy.value}
            onChange={onSortClick}>
            {sortByOptions.map(item => (<option value={item.value}
                key={item.value}>
                {item.label}
            </option>))}
        </select>
    )
}

SortByDropdown.propTypes = {
    sortBy: PropTypes.shape({
        "label": PropTypes.string,
        "field": PropTypes.string,
        "order": PropTypes.string,
    }),
    sortByOptions: PropTypes.arrayOf(
        PropTypes.shape({
            "label": PropTypes.string,
            "field": PropTypes.string,
            "order": PropTypes.string,
        }))
        .isRequired,
    onSortClick: PropTypes.func.isRequired
}

export default SortByDropdown;