import React from 'react';
import PropTypes from 'prop-types';

const ViewTypesDropdown = ({
    productViewType,
    productViewTypes,
    onProductViewClick }) => {
    return (<div className='UNX-productsview-list'>
        <select name="productsview"
            className="UBX-productsview-dropdown"
            value={productViewType}
            onChange={onProductViewClick}>
            {productViewTypes.map(item => (<option value={item}
                key={item}>
                {item}
            </option>))}
        </select>
    </div>)
}

ViewTypesDropdown.propTypes = {
    productViewType: PropTypes.string,
    productViewTypes: PropTypes.arrayOf(PropTypes.string),
    onProductViewClick: PropTypes.func.isRequired,
}

export default ViewTypesDropdown;
