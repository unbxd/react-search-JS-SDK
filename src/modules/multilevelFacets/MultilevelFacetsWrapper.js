import React from 'react';
import PropTypes from 'prop-types';

import GenerateFacets from './generateFacets/GenerateFacets';

const MultilevelFacetsWrapper = props => {
  const {
    bucketedFacets,
    addCategoryFilter,
    selectedBucketedFacet,
    breadCrumbsList,
    FacetItemComponent,
    label
  } = props;
  return (
    <GenerateFacets
      bucketedFacets={bucketedFacets}
      selectedBucketedFacet={selectedBucketedFacet}
      addCategoryFilter={addCategoryFilter}
      breadCrumbsList={breadCrumbsList}
      FacetItemComponent={FacetItemComponent}
      label={label}
    />
  );
};

MultilevelFacetsWrapper.propTypes = {
  bucketedFacets: PropTypes.array.isRequired,
  addCategoryFilter: PropTypes.func.isRequired,
  selectedBucketedFacet: PropTypes.object,
  breadCrumbsList: PropTypes.array,
  FacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  label:PropTypes.node
};

export default MultilevelFacetsWrapper;
