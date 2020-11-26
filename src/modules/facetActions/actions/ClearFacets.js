import React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from '../../../common/utils';
import { Button } from '../../../components';

const ClearFacets = (props) => {
    const { showClearFilter, onClearFilter, clearFilterComponent } = props;

    if (!showClearFilter) {
        return null;
    }

    return clearFilterComponent ? (
        cloneElement(clearFilterComponent, { onClearFilter })
    ) : (
        <Button
            className="UNX-facet__action  -clearFilters"
            onClick={onClearFilter}
        >
            Clear Facets
        </Button>
    );
};

ClearFacets.propTypes = {
    showClearFilter: PropTypes.bool.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    clearFilterComponent: PropTypes.element
};

export default ClearFacets;
