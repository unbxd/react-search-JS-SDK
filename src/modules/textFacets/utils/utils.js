import { facetTypes } from '../../../config';
export const getTextFacetItem = (facetObjectValues, dataId) => {
    return facetObjectValues.find((facetItem) => facetItem.dataId == dataId);
};

export const getFormattedTextFacets = (textFacets, selectedTextFacets) => {
    const formattedFacets = textFacets.map((facetObj) => {
        const { facetName } = facetObj;
        if (selectedTextFacets[facetName]) {
            const currentFacetObj = {
                facetType: facetTypes.TEXT_FACET,
                ...facetObj,
                isSelected: true
            };

            const activeFacets = selectedTextFacets[facetName];
            const values = currentFacetObj.values.map((facetitem) => {
                const hit = activeFacets.find(
                    (val) => facetitem.dataId === val.dataId
                );
                if (hit) {
                    return {
                        ...hit,
                        facetName,
                        isSelected: true
                    };
                } else {
                    return {
                        ...facetitem,
                        facetName
                    };
                }
            });
            currentFacetObj['values'] = values;
            return currentFacetObj;
        } else {
            const currentFacetObj = {
                ...facetObj,
                facetType: facetTypes.TEXT_FACET
            };
            const values = currentFacetObj.values.map((facetitem) => {
                return {
                    ...facetitem,
                    facetName
                };
            });
            currentFacetObj['values'] = values;
            return currentFacetObj;
        }
    });

    return formattedFacets;
};

export const getTextFacetFacetCoreMethods = (unbxdCore) => {
    const updateFacets = unbxdCore.updateFacets.bind(unbxdCore);
    const deleteAFacet = unbxdCore.deleteAFacet.bind(unbxdCore);
    const applyFacets = unbxdCore.applyFacets.bind(unbxdCore);
    const clearFacets = unbxdCore.clearFacets.bind(unbxdCore);
    const getSelectedFacet = unbxdCore.getSelectedFacet.bind(unbxdCore);
    const getSelectedFacets = unbxdCore.getSelectedFacets.bind(unbxdCore);
    const getFacets = unbxdCore.getFacets.bind(unbxdCore);
    const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
    const getResults = unbxdCore.getResults.bind(unbxdCore);

    return {
        updateFacets,
        deleteAFacet,
        applyFacets,
        clearFacets,
        getSelectedFacet,
        getSelectedFacets,
        getFacets,
        setPageStart,
        getResults
    };
};
