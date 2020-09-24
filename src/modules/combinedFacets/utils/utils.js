export const getFacetRow = (facetObjectValues, dataId) => {
  return facetObjectValues.find(facetItem => facetItem.dataId == dataId);
};

export const isFacetSelected = (selectedFacets, facetName, facetDataId) => {
  const fValues = selectedFacets[facetName];

  if (!fValues) return false;

  const hit = fValues.find(fElem => fElem.dataId == facetDataId);
  return hit ? true : false;
};

export const isRangeFacetSelected = (currentFacetRangeVal, facetRangeValues) => {
  const { facetName, valMin, valMax } = currentFacetRangeVal;
  let currentFacetObj = {};
  facetRangeValues.forEach((facet) => {
    if(facet.facetType === 'range' && facet.facetName === facetName){
      currentFacetObj = facet
    }
  });
  const { values = [] } = currentFacetObj;
  const match = values.find((rangeValues) => {
    const { from, to, isSelected } = rangeValues;
    const { dataId: fromValue } = from;
    const { dataId: toValue } = to;

    if (valMin >= fromValue && valMax <= toValue && isSelected) {
      return true;
    }
  });

  if (match) return true;
  return false;
};

export const getSelectedRangeFacets = (rangeFilterObject) => {
  const selectedRangeFacets = {};

  Object.keys(rangeFilterObject).map((facetName) => {
    const filterString = rangeFilterObject[facetName][0];
    const [valMin, valMax] = filterString
      .replace('[', '')
      .replace(']', '')
      .split(' TO ');
    selectedRangeFacets[facetName] = { valMin, valMax };
  });

  return selectedRangeFacets;
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

export const getRangeFacetCoreMethods = (unbxdCore) => {
  const getRangeFacets = unbxdCore.getRanges.bind(unbxdCore);
  const setRangeFacet = unbxdCore.setRangeFacet.bind(unbxdCore);
  const applyRangeFacet = unbxdCore.applyRangeFacet.bind(unbxdCore);
  const clearARangeFacet = unbxdCore.clearARangeFacet.bind(unbxdCore);
  const selectedRangeFacets = unbxdCore.state.rangeFacet;

  return {
    getRangeFacets,
    setRangeFacet,
    applyRangeFacet,
    clearARangeFacet,
    selectedRangeFacets
  };
};
