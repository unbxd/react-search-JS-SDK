export const getSelectedRangeFacets = (rangeFilterObject) => {
    const selectedRangeFacets = {};

    Object.keys(rangeFilterObject).map((facetName) => {
        const filterStringArr = rangeFilterObject[facetName];
        filterStringArr.map((filterString) => {
            const [valMin, valMax] = filterString
                .replace('[', '')
                .replace(']', '')
                .split(' TO ');
            if (!selectedRangeFacets[facetName]) {
                selectedRangeFacets[facetName] = [];
            }
            selectedRangeFacets[facetName].push({ valMin, valMax });
        });
    });

    return selectedRangeFacets;
};

export const isFacetSelected = (currentFacetRangeVal, facetRangeValues) => {
    const { facetName, valMin, valMax } = currentFacetRangeVal;
    const currentFacetObj = facetRangeValues[facetName] || {};
    const { values = [] } = currentFacetObj;
    const match = values.find((rangeValues) => {
        const { from, end, isSelected } = rangeValues;
        const { dataId: fromValue } = from;
        const { dataId: toValue } = end;

        if (valMin >= fromValue && valMax <= toValue && isSelected) {
            return true;
        }
    });

    if (match) return true;
    return false;
};

export const getUpdatedFacets = (
    rangeFacets,
    selectedRangeFacets,
    existingState
) => {
    let formattedSelectedFacets = {};
    if (Object.keys(selectedRangeFacets).length) {
        formattedSelectedFacets = getSelectedRangeFacets(selectedRangeFacets);
    }
    const updatedFacetState = {};

    rangeFacets.map((facet) => {
        const { facetName, displayName, start, end, values } = facet;

        const sliderMin = parseInt(start);
        const sliderMax = parseInt(end);

        if (formattedSelectedFacets[facetName]) {
            const selectedValues = formattedSelectedFacets[facetName];
            const valuesAggregator = [];
            selectedValues.map((selectedValue) => {
                const valMin = parseInt(selectedValue['valMin']);
                const valMax = parseInt(selectedValue['valMax']);

                values.map((rangeValues, idx) => {
                    const { from, end } = rangeValues;
                    const { dataId: fromValue } = from;
                    const { dataId: toValue } = end;
                    const key = `${fromValue}_${toValue}`;
                    const currentVal = valuesAggregator.find((val) => val[key]);
                    if (
                        currentVal === undefined ||
                        !currentVal[key]['isSelected']
                    ) {
                        const tempVal = {};
                        if (valMin >= fromValue && valMax <= toValue) {
                            tempVal[key] = {
                                ...rangeValues,
                                isSelected: true,
                            };
                        } else {
                            tempVal[key] = {
                                ...rangeValues,
                                isSelected: false,
                            };
                        }
                        tempVal['id'] = `${facetName}_${fromValue}-${toValue}`;
                        valuesAggregator[idx] = tempVal;
                    }
                });

                const aggregatedValues = valuesAggregator.map(
                    (val) => Object.values(val)[0]
                );
                updatedFacetState[facetName] = {
                    sliderMin,
                    sliderMax,
                    valMin,
                    valMax,
                    values: aggregatedValues,
                    displayName,
                    isSelected: true,
                };
            });
        } else {
            const valMin = sliderMin;
            const valMax = sliderMax;
            const formattedValues = values.map((val) => {
                const { from, end } = val;
                const { dataId: fromValue } = from;
                const { dataId: toValue } = end;
                const id = `${fromValue}_${toValue}`;
                return { ...val, id };
            });
            updatedFacetState[facetName] = {
                sliderMin,
                sliderMax,
                valMin,
                valMax,
                displayName,
                values: formattedValues,
                isSelected: false,
            };
        }

        if (existingState) {
            const currentFacet = existingState.rangeValues[facetName];
            updatedFacetState[facetName]['isOpen'] = currentFacet
                ? currentFacet['isOpen']
                : true;
        }
    });

    return updatedFacetState;
};

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
        selectedRangeFacets,
    };
};
