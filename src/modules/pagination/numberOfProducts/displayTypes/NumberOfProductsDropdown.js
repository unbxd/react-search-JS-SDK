import React from 'react';
import PropTypes from 'prop-types';

const NumberOfProductsDropdown = ({ pageSize, pageSizeOptions, onPageSizeClick }) => {

    return (
        <select name="pageSize"
            className="UNX-pageSize__dropdown"
            value={pageSize}
            onChange={onPageSizeClick}>
            {pageSizeOptions.map(item => (<option value={item.id}
                key={item.id}>
                {item.value}
            </option>))}
        </select>
    )
}

NumberOfProductsDropdown.propTypes = {
    pageSize: PropTypes.number.isRequired,
    pageSizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string }))
        .isRequired,
    onPageSizeClick: PropTypes.func.isRequired
}

export default NumberOfProductsDropdown;
