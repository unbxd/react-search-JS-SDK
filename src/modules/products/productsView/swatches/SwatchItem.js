import React from 'react';
import PropTypes from 'prop-types';

const SwatchItem = ({ itemData, onClick }) => {

    const { swatchImageUrl, swatchId, active } = itemData;
    return (<div
        className={`UNX-swatch__item ${active ? '-active' : ''}`}
        data-variant_id={swatchId}
        onClick={onClick}
    >
        <img
            data-variant_id={swatchId}
            src={swatchImageUrl} className='-image' />
    </div>)
}

SwatchItem.propTypes = {
    itemData: PropTypes.object.isRequired,
}

export default SwatchItem;
