export const getFacetCoreMethods = (unbxdCore) => {
    const getBreadCrumbsList = unbxdCore.getBreadCrumbsList.bind(unbxdCore);
    const deleteCategoryFilter = unbxdCore.deleteCategoryFilter.bind(unbxdCore);
    const getSelectedBucketedFacet = unbxdCore.getSelectedBucketedFacet.bind(unbxdCore);
    const getResults = unbxdCore.getResults.bind(unbxdCore);

    return {
        getBreadCrumbsList,
        deleteCategoryFilter,
        getSelectedBucketedFacet,
        getResults
    };
};
