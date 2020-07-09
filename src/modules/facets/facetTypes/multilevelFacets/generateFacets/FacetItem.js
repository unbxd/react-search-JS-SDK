import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../../../components';

const FacetItem = ({ itemData, multiLevelField, level, onClick }) => {
    const { name, count } = itemData;
    return (<Button
        data-unx_categoryname={name}
        data-unx_multilevelfield={multiLevelField}
        data-unx_level={level}
        className='UNX-bucketedFacet__item'
        onClick={onClick}
    >
        {name}-{count}
    </Button>)
}

FacetItem.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number,
    }).isRequired,
    multiLevelField: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired
}

export default FacetItem;
