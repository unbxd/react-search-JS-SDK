export const getFacetCoreMethods = (unbxdCore) => {
    const deleteAFacet = unbxdCore.deleteAFacet.bind(unbxdCore);
    const getSelectedFacets = unbxdCore.getSelectedFacets.bind(unbxdCore);
    const getFacets = unbxdCore.getFacets.bind(unbxdCore);
    const applyRangeFacet = unbxdCore.applyRangeFacet.bind(unbxdCore);
    const setRangeFacet = unbxdCore.setRangeFacet.bind(unbxdCore);
    const clearARangeFacet = unbxdCore.clearARangeFacet.bind(unbxdCore);
    const selectedRangeFacets = unbxdCore.state.rangeFacet;

    return {
        deleteAFacet,
        getSelectedFacets,
        getFacets,
        applyRangeFacet,
        setRangeFacet,
        clearARangeFacet,
        selectedRangeFacets
    };
};
