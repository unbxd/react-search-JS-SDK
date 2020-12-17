export const getParsedFacets = (selectedTextFacets, selectedRangeFacets) => {
    const parsedTextFacets = {};
    Object.keys(selectedTextFacets).map((facetName) => {
        const facetArr = selectedTextFacets[facetName];
        parsedTextFacets[facetName] = [];
        facetArr.map((facetItem) => {
            const { dataId } = facetItem;
            parsedTextFacets[facetName].push(dataId);
        });
    });

    const parsedRangeFacets = {};
    Object.keys(selectedRangeFacets).map((facetName) => {
        const facetArr = selectedRangeFacets[facetName];
        parsedRangeFacets[facetName] = [];
        facetArr.map((facetItem) => {
            const { valMin, valMax } = facetItem;
            parsedRangeFacets[facetName].push(`${valMin} TO ${valMax}`);
        });
    });
    return { ...parsedTextFacets, ...parsedRangeFacets };
};

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
