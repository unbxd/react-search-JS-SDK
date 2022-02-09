import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const FacetItem = ({ itemData, onClick }) => {
    const { name, count, level, isSelected = false, fieldName, dataId } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <Button
            className={`UNX-facet__item -l${level} ${
                isSelected ? '-selected' : ''
            }`}
            onClick={handleClick}
            data-testid="UNX_multilevelFacet__facetItem"
            data-facet-name={fieldName}
            data-id={dataId}
        >
            {name} {count && <span>-{count}</span>}
        </Button>
    );
};

FacetItem.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number,
        level: PropTypes.number,
        isSelected: PropTypes.bool,
        fieldName: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default FacetItem;
