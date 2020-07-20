import React from 'react';
import PropTypes from 'prop-types';

import { ApplyFacets, ClearFacets } from './actions';

const FacetActionsWrapper = props => {
  const {
    showApplyFilter,
    showClearFilter,
    onApplyFilter,
    onClearFilter,
    noOfPages,
    ApplyFilterComponent,
    ClearFilterComponent
  } = props;

  if (noOfPages === 0) {
    return null;
  }

  return (
    <div className="UNX-facetActions__container">
      <ApplyFacets
        showApplyFilter={showApplyFilter}
        onApplyFilter={onApplyFilter}
        ApplyFilterComponent={ApplyFilterComponent}
      />
      <ClearFacets
        showClearFilter={showClearFilter}
        onClearFilter={onClearFilter}
        ClearFilterComponent={ClearFilterComponent}
      />
    </div>
  );
};

FacetActionsWrapper.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired,
  noOfPages: PropTypes.number.isRequired,
  selectedFacets: PropTypes.object,
  showApplyFilter: PropTypes.bool,
  showClearFilter: PropTypes.bool,
  ApplyFilterComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  ClearFilterComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default FacetActionsWrapper;
