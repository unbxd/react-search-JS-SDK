export const getFacetCoreMethods = (unbxdCore) => {
    const getBucketedFacets = unbxdCore.getBucketedFacets.bind(unbxdCore);
    const getBreadCrumbsList = unbxdCore.getBreadCrumbsList.bind(unbxdCore);
    const setCategoryFilter = unbxdCore.setCategoryFilter.bind(unbxdCore);
    const deleteCategoryFilter = unbxdCore.deleteCategoryFilter.bind(unbxdCore);
    const getResults = unbxdCore.getResults.bind(unbxdCore);

    return {
        getBucketedFacets,
        getBreadCrumbsList,
        setCategoryFilter,
        deleteCategoryFilter,
        getResults
    };
};
