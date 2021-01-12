import React from 'react';
import PropTypes from 'prop-types';
import { facetTypes } from '../../config';

const FacetItem = ({ itemData, onClick, priceUnit }) => {
    const { name, type, dataId } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    let selectedFacetMarkup = null;
    if (type === facetTypes.TEXT_FACET) {
        selectedFacetMarkup = <span>{name}</span>;
    }
    if (type === facetTypes.RANGE_FACET) {
        const [valMin, valMax] = dataId.split(' TO ');
        selectedFacetMarkup = (
            <span>
                {priceUnit} {valMin} - {priceUnit} {valMax}
            </span>
        );
    }

    return (
        <div className="UNX-selectedFacets__item" onClick={handleClick}>
            {selectedFacetMarkup} x
        </div>
    );
};

FacetItem.propTypes = {
    itemData: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    priceUnit: PropTypes.string
};

export default FacetItem;
