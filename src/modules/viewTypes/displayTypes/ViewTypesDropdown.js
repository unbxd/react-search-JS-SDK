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
                const { viewType } = item;
                const dataTestId =
                    viewType === 'GRID' ? 'UNX_gridBtn' : 'UNX_listBtn';
                return (
                    <option
                        value={viewType}
                        key={viewType}
                        data-testid={dataTestId}
                    >
                        {viewType}
                    </option>
                );
            })}
        </select>
    );
};

ViewTypesDropdown.propTypes = {
    viewType: PropTypes.string,
    viewTypes: PropTypes.arrayOf(
        PropTypes.shape({
            isSelected: PropTypes.bool,
            viewType: PropTypes.string
        })
    ),
    onViewTypeClick: PropTypes.func.isRequired
};

export default ViewTypesDropdown;
