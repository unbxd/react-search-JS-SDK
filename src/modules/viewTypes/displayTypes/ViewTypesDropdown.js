import React from 'react';
import PropTypes from 'prop-types';

const ViewTypesDropdown = ({
    viewType,
    viewTypes,
    onViewTypeClick }) => {

    return (<select name="productsview"
        className="UNX-viewTypes__dropdown"
        value={viewType}
        onChange={onViewTypeClick}>
        {viewTypes.map(item => (<option value={item}
            key={item}>
            {item}
        </option>))}
    </select>)
}

ViewTypesDropdown.propTypes = {
    viewType: PropTypes.string,
    viewTypes: PropTypes.arrayOf(PropTypes.string),
    onViewTypeClick: PropTypes.func.isRequired,
}

export default ViewTypesDropdown;
