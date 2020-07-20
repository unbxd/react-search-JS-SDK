export const getSelectedRangeFacets = (rangeFilterObject) => {

    const selectedRangeFacets = {};

    Object.keys(rangeFilterObject).map((facetName) => {
        const filterString = rangeFilterObject[facetName][0];
        const [valMin, valMax] = filterString.replace('[', '').replace(']', '').split(" TO ");
        selectedRangeFacets[facetName] = { valMin, valMax };
    })

    return selectedRangeFacets;
}

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
    }
}
