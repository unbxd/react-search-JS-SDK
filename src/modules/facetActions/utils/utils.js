export const getFacetCoreMethods = unbxdCore => {
  const applyFacets = unbxdCore.applyFacets.bind(unbxdCore);
  const clearFacets = unbxdCore.clearFacets.bind(unbxdCore);
  const selectedRangeFacets = unbxdCore.state.rangeFacet;
  const clearARangeFacet = unbxdCore.clearARangeFacet.bind(unbxdCore);
  const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);

  return {
    applyFacets,
    clearFacets,
    selectedRangeFacets,
    clearARangeFacet,
    getPaginationInfo
  };
};
