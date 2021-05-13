import React from 'react';
import PropTypes from 'prop-types';

const PageSizeDropdown = ({ size, sizeOptions, onPageSizeClick }) => {
    return (
        <select
            name="pageSize"
            id="UNX-pageSize__dropdown"
            className="UNX-pageSize__dropdown"
            data-testid="UNX-pageSize__dropdown"
            value={size}
            onChange={onPageSizeClick}
        >
            {sizeOptions.map((item) => (
                <option value={item.id} key={item.id}>
                    {item.value}
                </option>
            ))}
        </select>
    );
};

PageSizeDropdown.propTypes = {
    size: PropTypes.number.isRequired,
    sizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string })
    ).isRequired,
    onPageSizeClick: PropTypes.func.isRequired
};

export default PageSizeDropdown;
