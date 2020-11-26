import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const FacetItem = ({ itemData, onClick }) => {
    const { name, count, level, isSelected = false } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <Button
            className={`UNX-facet__item -l${level} ${
                isSelected ? '-selected' : ''
            }`}
            onClick={handleClick}
        >
            {name} {count && <span>-{count}</span>}
        </Button>
    );
};

FacetItem.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number
    }).isRequired,
    multiLevelField: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default FacetItem;
