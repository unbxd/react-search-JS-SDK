import React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from '../../../common/utils';
import { Button } from '../../../components';

const ApplyFacets = (props) => {
    const { showApplyFilter, onApplyFilter, applyFilterComponent } = props;

    if (!showApplyFilter) {
        return null;
    }

    return applyFilterComponent ? (
        cloneElement(applyFilterComponent, { onApplyFilter })
    ) : (
        <Button
            className="UNX-facet__action -applyFilters"
            onClick={onApplyFilter}
        >
            Apply Facets
        </Button>
    );
};

ApplyFacets.propTypes = {
    showApplyFilter: PropTypes.bool.isRequired,
    onApplyFilter: PropTypes.func.isRequired,
    applyFilterComponent: PropTypes.element
};

export default ApplyFacets;
