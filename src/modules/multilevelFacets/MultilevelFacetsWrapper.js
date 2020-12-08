import React from 'react';
import PropTypes from 'prop-types';

import GenerateFacets from './generateFacets/GenerateFacets';

const MultilevelFacetsWrapper = (props) => {
    const {
        onFacetClick,
        multilevelFacets,
        facetItemComponent,
        label,
        collapsible,
        searchable,
        enableViewMore,
        minViewMore
    } = props;
    return (
        <GenerateFacets
            onFacetClick={onFacetClick}
            multilevelFacets={multilevelFacets}
            facetItemComponent={facetItemComponent}
            label={label}
            collapsible={collapsible}
            minViewMore={minViewMore}
            enableViewMore={enableViewMore}
            searchable={searchable}
        />
    );
};

MultilevelFacetsWrapper.propTypes = {
    onFacetClick: PropTypes.func.isRequired,
    facetItemComponent: PropTypes.element,
    multilevelFacets: PropTypes.array,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
    enableViewMore: PropTypes.bool,
    minViewMore: PropTypes.number
};

export default MultilevelFacetsWrapper;
