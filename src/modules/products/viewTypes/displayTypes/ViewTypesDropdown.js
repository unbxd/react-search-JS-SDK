import React from 'react';
import PropTypes from 'prop-types';

const ViewTypesDropdown = ({
    productViewType,
    productViewTypes,
    onProductViewClick }) => {

    return (<select name="productsview"
        className="UNX-viewTypes__dropdown"
        value={productViewType}
        onChange={onProductViewClick}>
        {productViewTypes.map(item => (<option value={item}
            key={item}>
            {item}
        </option>))}
    </select>)
}

ViewTypesDropdown.propTypes = {
    productViewType: PropTypes.string,
    productViewTypes: PropTypes.arrayOf(PropTypes.string),
    onProductViewClick: PropTypes.func.isRequired,
}

export default ViewTypesDropdown;
