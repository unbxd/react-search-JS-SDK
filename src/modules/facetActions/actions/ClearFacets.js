import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components';

const ClearFacets = props => {
  const { showClearFilter, onClearFilter, ClearFilterComponent } = props;

  if (!showClearFilter) {
    return null;
  }

  return ClearFilterComponent ? (
    <ClearFilterComponent onClearFilter={onClearFilter} />
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
  ClearFilterComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default ClearFacets;
