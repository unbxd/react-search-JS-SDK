export const getFacetRow = (facetObjectValues, dataId) => {
    return facetObjectValues.find(facetItem => (facetItem.dataId == dataId))
}

export const isFacetSelected = (selectedFacets, facetName, facetDataId) => {

    const fValues = selectedFacets[facetName];

    if (!fValues)
        return false

    const hit = fValues.find(fElem => (fElem.dataId == facetDataId));
    return hit ? true : false;
}

export const getSelectedRangeFacets = (rangeFilterObject) => {

    const selectedRangeFacets = {};

    Object.keys(rangeFilterObject).map((facetName) => {
        const filterString = rangeFilterObject[facetName];
        const [valMin, valMax] = filterString.replace('[', '').replace(']', '').split(" TO ");
        selectedRangeFacets[facetName] = { valMin, valMax };
    })

    return selectedRangeFacets;
}

export const getMinMax = (facetObject) => {

    const { values = {}, facetName, displayName } = facetObject;
    const { counts = [] } = values;
    const sliderMin = parseInt(counts[0] || 0);
    const sliderMax = parseInt(counts[counts.length - 2] || 0);

    return { sliderMin, sliderMax, facetName, displayName };
}
