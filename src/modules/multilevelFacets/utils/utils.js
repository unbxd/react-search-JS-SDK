export const getFacetCoreMethods = unbxdCore => {
  const getBucketedFacets = unbxdCore.getBucketedFacets.bind(unbxdCore);
  const getSelectedBucketedFacet = unbxdCore.getSelectedBucketedFacet.bind(
    unbxdCore
  );
  const getBreadCrumbsList = unbxdCore.getBreadCrumbsList.bind(unbxdCore);
  const setCategoryFilter = unbxdCore.setCategoryFilter.bind(unbxdCore);
  const getResults = unbxdCore.getResults.bind(unbxdCore);

  return {
    getBucketedFacets,
    getSelectedBucketedFacet,
    getBreadCrumbsList,
    setCategoryFilter,
    getResults
  };
};
