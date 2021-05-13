import React from 'react';
import PropTypes from 'prop-types';
import { facetTypes } from '../../config';

const FacetItem = ({ itemData, onClick, priceUnit }) => {
    const { name, type, dataId, facetName } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    let selectedFacetMarkup = null;
    let facetVal = dataId;
    if (type === facetTypes.TEXT_FACET) {
        selectedFacetMarkup = <span>{name}</span>;
    }
    if (type === facetTypes.RANGE_FACET) {
        const [valMin, valMax] = dataId.split(' TO ');
        facetVal = `[${valMin}-${valMax}]`;
        selectedFacetMarkup = (
            <span>
                {priceUnit} {valMin} - {priceUnit} {valMax}
            </span>
        );
    }

    return (
        <div
            className="UNX-selectedFacets__item"
            onClick={handleClick}
            data-facet-name={facetName}
            data-id={facetVal}
            tabIndex={0}
            role={'button'}
        >
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
