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

export const getFacetCoreMethods = (unbxdCore) => {

    const updateFacets = unbxdCore.updateFacets.bind(unbxdCore);
    const deleteAFacet = unbxdCore.deleteAFacet.bind(unbxdCore);
    const applyFacets = unbxdCore.applyFacets.bind(unbxdCore);
    const clearFacets = unbxdCore.clearFacets.bind(unbxdCore);
    const getSelectedFacet = unbxdCore.getSelectedFacet.bind(unbxdCore);
    const getSelectedFacets = unbxdCore.getSelectedFacets.bind(unbxdCore);
    const getFacets = unbxdCore.getFacets.bind(unbxdCore);
    

    const getRangeFacets = unbxdCore.getRangeFacets.bind(unbxdCore);
    const setRangeFacet = unbxdCore.setRangeFacet.bind(unbxdCore);
    const applyRangeFacet = unbxdCore.applyRangeFacet.bind(unbxdCore);
    const clearARangeFacet = unbxdCore.clearARangeFacet.bind(unbxdCore);
    const selectedRangeFacets = unbxdCore.state.rangeFacet;

    const getBucketedFacets = unbxdCore.getBucketedFacets.bind(unbxdCore);
    const getSelectedBucketedFacet = unbxdCore.getSelectedBucketedFacet.bind(unbxdCore);
    const getBreadCrumbsList = unbxdCore.getBreadCrumbsList.bind(unbxdCore);
    const setCategoryFilter = unbxdCore.setCategoryFilter.bind(unbxdCore);
    const deleteCategoryFilter = unbxdCore.deleteCategoryFilter.bind(unbxdCore);
    const selectedCategoryFilters = unbxdCore.state.categoryFilter;
    const getResults = unbxdCore.getResults.bind(unbxdCore);

    const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
    const getSearchQuery = unbxdCore.getSearchQuery.bind(unbxdCore);

    return {
        updateFacets,
        deleteAFacet,
        applyFacets,
        clearFacets,
        getSelectedFacet,
        getSelectedFacets,
        getFacets,
        getRangeFacets,
        setRangeFacet,
        applyRangeFacet,
        clearARangeFacet,
        selectedRangeFacets,
        getBucketedFacets,
        getSelectedBucketedFacet,
        getBreadCrumbsList,
        setCategoryFilter,
        deleteCategoryFilter,
        selectedCategoryFilters,
        getResults,
        getPaginationInfo,
        getSearchQuery
    }
}
