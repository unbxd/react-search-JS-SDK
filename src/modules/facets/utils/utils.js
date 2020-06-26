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
