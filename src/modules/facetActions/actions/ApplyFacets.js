import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const ApplyFacets = props => {
  const { showApplyFilter, onApplyFilter, ApplyFilterComponent } = props;

  if (!showApplyFilter) {
    return null;
  }

  return ApplyFilterComponent ? (
    <ApplyFilterComponent onApplyFilter={onApplyFilter} />
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
  ApplyFilterComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default ApplyFacets;
