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
    label,
    collapsible,
    searchable
  } = props;
  return (
    <GenerateFacets
      bucketedFacets={bucketedFacets}
      selectedBucketedFacet={selectedBucketedFacet}
      addCategoryFilter={addCategoryFilter}
      breadCrumbsList={breadCrumbsList}
      FacetItemComponent={FacetItemComponent}
      label={label}
      collapsible={collapsible}
      searchable={searchable}
    />
  );
};

MultilevelFacetsWrapper.propTypes = {
  bucketedFacets: PropTypes.array.isRequired,
  addCategoryFilter: PropTypes.func.isRequired,
  selectedBucketedFacet: PropTypes.object,
  breadCrumbsList: PropTypes.array,
  FacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  label:PropTypes.node,
  collapsible: PropTypes.bool,
  searchable: PropTypes.bool
};

export default MultilevelFacetsWrapper;
