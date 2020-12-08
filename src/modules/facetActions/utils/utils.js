export const getFacetCoreMethods = (unbxdCore) => {
    const applyFacets = unbxdCore.applyFacets.bind(unbxdCore);
    const clearFacets = unbxdCore.clearFacets.bind(unbxdCore);
    const lastSelectedRangeFacets = unbxdCore.state.rangeFacet;
    const setRangeFacet = unbxdCore.setRangeFacet.bind(unbxdCore);
    const applyRangeFacet = unbxdCore.applyRangeFacet.bind(unbxdCore);
    const clearARangeFacet = unbxdCore.clearARangeFacet.bind(unbxdCore);
    const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);

    return {
        applyFacets,
        clearFacets,
        lastSelectedRangeFacets,
        setRangeFacet,
        applyRangeFacet,
        clearARangeFacet,
        getPaginationInfo
    };
};
