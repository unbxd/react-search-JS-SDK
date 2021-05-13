import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const FacetItem = ({ itemData, onClick }) => {
    const { name, count, isSelected = false, facetName } = itemData;
    const stateClass = `UNX-facet__item ${isSelected ? '-selected' : ''}`;
    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <Button
            className={stateClass}
            onClick={handleClick}
            data-testid="UNX_textFacet__facetItem"
            data-facet-name={facetName}
            data-id={name}
        >
            {name} - {count}
        </Button>
    );
};

FacetItem.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number,
        dataId: PropTypes.string,
        isSelected: PropTypes.bool,
        facetName: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default FacetItem;
