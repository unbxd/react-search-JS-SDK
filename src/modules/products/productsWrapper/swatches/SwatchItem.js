import React from 'react';
import PropTypes from 'prop-types';

const SwatchItem = ({ itemData, onClick }) => {
    const { swatchImageUrl, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <div
            className={`UNX-swatch__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            <img src={swatchImageUrl} className="-image" />
        </div>
    );
};

SwatchItem.propTypes = {
    itemData: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SwatchItem;
