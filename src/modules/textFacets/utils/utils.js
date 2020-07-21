export const getFacetRow = (facetObjectValues, dataId) => {
  return facetObjectValues.find(facetItem => facetItem.dataId == dataId);
};

export const isFacetSelected = (selectedFacets, facetName, facetDataId) => {
  const fValues = selectedFacets[facetName];

  if (!fValues) return false;

  const hit = fValues.find(fElem => fElem.dataId == facetDataId);
  return hit ? true : false;
};

export const getFacetCoreMethods = unbxdCore => {
  const updateFacets = unbxdCore.updateFacets.bind(unbxdCore);
  const deleteAFacet = unbxdCore.deleteAFacet.bind(unbxdCore);
  const applyFacets = unbxdCore.applyFacets.bind(unbxdCore);
  const clearFacets = unbxdCore.clearFacets.bind(unbxdCore);
  const getSelectedFacet = unbxdCore.getSelectedFacet.bind(unbxdCore);
  const getSelectedFacets = unbxdCore.getSelectedFacets.bind(unbxdCore);
  const getFacets = unbxdCore.getFacets.bind(unbxdCore);
  const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
  const getResults = unbxdCore.getResults.bind(unbxdCore);

  return {
    updateFacets,
    deleteAFacet,
    applyFacets,
    clearFacets,
    getSelectedFacet,
    getSelectedFacets,
    getFacets,
    setPageStart,
    getResults
  };
};
