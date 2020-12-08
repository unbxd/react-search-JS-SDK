const getActiveFacets = (unbxdSearchObj) => {
    const textFacets = unbxdSearchObj.state.selectedFacets;
    const rangeFacets = unbxdSearchObj.state.rangeFacet;
    const categoryFacets = unbxdSearchObj.state.categoryFilter;
    const textFacetsArr = Object.keys(textFacets);
    const categoryFacetsArr = Object.keys(categoryFacets);

    const activeTextFacets = {};
    textFacetsArr.forEach((facet) => {
        const valObj = textFacets[facet];
        const arr = [];
        valObj.forEach((val) => {
            arr.push(val.name);
        });
        activeTextFacets[facet] = arr;
    });

    const activeRangeFacets = rangeFacets;

    const activeCategoryFacets = {};
    categoryFacetsArr.forEach((category) => {
        const val = categoryFacets[category];
        if (Array.isArray(val)) {
            const original = val.join('>');
            activeCategoryFacets[category] = original;
        }
    });

    const activeFacetsObj = {
        ...activeTextFacets,
        ...activeRangeFacets,
        ...activeCategoryFacets
    };

    return activeFacetsObj;
};

export default getActiveFacets;
