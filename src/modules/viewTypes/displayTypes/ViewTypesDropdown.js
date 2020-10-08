import React from 'react';
import PropTypes from 'prop-types';

const ViewTypesDropdown = ({ viewType, viewTypes, onViewTypeClick }) => {
    return (
        <select
            name="productsview"
            className="UNX-viewTypes__dropdown"
            value={viewType}
            onChange={onViewTypeClick}
        >
            {viewTypes.map((item) => {
                const dataTestId =
                    item === 'GRID' ? `UNX_gridBtn` : `UNX_listBtn`;
                return (
                    <option value={item} key={item} data-testid={dataTestId}>
                        {item}
                    </option>
                );
            })}
        </select>
    );
};

ViewTypesDropdown.propTypes = {
    viewType: PropTypes.string,
    viewTypes: PropTypes.arrayOf(PropTypes.string),
    onViewTypeClick: PropTypes.func.isRequired,
};

export default ViewTypesDropdown;
