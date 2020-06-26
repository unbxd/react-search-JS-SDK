import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const ActiveFacetItem = ({ itemData, facetName }) => {

    const { name, dataId } = itemData;

    return (<Button
        key={dataId}
        data-unx_name={facetName}
        data-unx_dataid={dataId}
        className='UNX-active-facet-item'>
        {name}
    </Button>)
}

ActiveFacetItem.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number,
        dataId: PropTypes.number
    }).isRequired,
    facetName: PropTypes.string.isRequired,
}

export default ActiveFacetItem;
