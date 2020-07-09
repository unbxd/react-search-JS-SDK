import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const SelectedFacetItem = ({ itemData, facetName, onClick }) => {

    const { name, dataId } = itemData;

    return (<Button
        key={dataId}
        data-unx_name={facetName}
        data-unx_dataid={dataId}
        className='UNX-selectedFacet__item'
        onClick={onClick}>
        {name}
    </Button>)
}

SelectedFacetItem.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number,
        dataId: PropTypes.number
    }).isRequired,
    facetName: PropTypes.string.isRequired,
}

export default SelectedFacetItem;
