import React from 'react';
import PropTypes from 'prop-types';

import GenerateFacets from './generateFacets/GenerateFacets';

const MultilevelFacetsWrapper = (props) => {
    const {
        onFacetClick,
        multilevelFacets,
        FacetItemComponent,
        label,
        collapsible,
        searchable,
        enableViewMore
    } = props;
    return (
        <GenerateFacets
            onFacetClick={onFacetClick}
            multilevelFacets={multilevelFacets}
            FacetItemComponent={FacetItemComponent}
            label={label}
            collapsible={collapsible}
            enableViewMore={enableViewMore}
            searchable={searchable}
        />
    );
};

MultilevelFacetsWrapper.propTypes = {
    onFacetClick: PropTypes.func.isRequired,
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
};

export default MultilevelFacetsWrapper;
