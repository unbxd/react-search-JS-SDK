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

export const isFacetSelected = (currentFacetRangeVal, facetRangeValues) => {
  const { facetName, valMin, valMax } = currentFacetRangeVal;
  const currentFacetObj = facetRangeValues[facetName] || {};
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

export const getFacetCoreMethods = (unbxdCore) => {
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
