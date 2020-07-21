import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const FacetItem = ({ itemData, isFacetSelected, selectedFacets, facetName, onClick }) => {

    const { name, count, dataId } = itemData;
    const isSelected = isFacetSelected(selectedFacets, facetName, dataId);
    const stateClass = `UNX-textFacet__item ${isSelected ? 'active' : ''}`;

    return (<Button
        data-unx_name={facetName}
        data-unx_dataid={dataId}
        className={stateClass}
        onClick={onClick}>{name} - {count}</Button>)
}

FacetItem.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number,
        dataId: PropTypes.string
    }).isRequired,
    isFacetSelected: PropTypes.func.isRequired,
    selectedFacets: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    facetName: PropTypes.string.isRequired,
}

export default FacetItem;
