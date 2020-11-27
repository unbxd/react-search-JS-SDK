import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const FacetItem = ({ itemData, onClick }) => {
    const { name, count, isSelected = false } = itemData;
    const stateClass = `UNX-facet__item ${isSelected ? '-selected' : ''}`;
    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <Button className={stateClass} onClick={handleClick}>
            {name} - {count}
        </Button>
    );
};

FacetItem.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number,
        dataId: PropTypes.string,
        isSelected: PropTypes.bool
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default FacetItem;
