import React from 'react';
import PropTypes from 'prop-types';

import { ApplyFacets, ClearFacets } from './actions';

const FacetActionsWrapper = (props) => {
    const {
        showApplyFilter,
        showClearFilter,
        onApplyFilter,
        onClearFilter,
        noOfPages,
        applyFilterComponent,
        clearFilterComponent
    } = props;

    if (noOfPages === 0) {
        return null;
    }

    return (
        <div className="UNX-facetActions__container">
            <ApplyFacets
                showApplyFilter={showApplyFilter}
                onApplyFilter={onApplyFilter}
                applyFilterComponent={applyFilterComponent}
            />
            <ClearFacets
                showClearFilter={showClearFilter}
                onClearFilter={onClearFilter}
                clearFilterComponent={clearFilterComponent}
            />
        </div>
    );
};

FacetActionsWrapper.propTypes = {
    onApplyFilter: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    noOfPages: PropTypes.number.isRequired,
    selectedTextFacets: PropTypes.object,
    showApplyFilter: PropTypes.bool,
    showClearFilter: PropTypes.bool,
    applyFilterComponent: PropTypes.element,
    clearFilterComponent: PropTypes.element
};

export default FacetActionsWrapper;
