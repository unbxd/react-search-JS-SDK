export const facetTypes = {
    TEXT_FACET: 'TEXT_FACET',
    RANGE_FACET: 'RANGE_FACET',
    MULTILEVEL_FACET: 'MULTILEVEL_FACET',
};

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

export const getFormattedRangeFacets = (rangeFacets, selectedRangeFacets) => {
    let selectedFacets = {};
    if (Object.keys(selectedRangeFacets).length) {
        selectedFacets = getSelectedRangeFacets(selectedRangeFacets);
    }

    const formattedFacets = rangeFacets.map((facetObj) => {
        const { facetName } = facetObj;

        if (selectedFacets[facetName]) {
            const { start, end } = facetObj;
            const sliderMin = start;
            const sliderMax = end;
            const currentFacetObj = {
                ...facetObj,
                facetType: facetTypes.RANGE_FACET,
                sliderMax,
                sliderMin,
                isSelected: true,
                viewLess: false,
                className: 'UNX-facet__list',
            };
            const activeFacets = selectedFacets[facetName];
            const values = currentFacetObj.values.map((facetitem) => {
                const { from, end } = facetitem;
                const { dataId: fromValue } = from;
                const { dataId: toValue } = end;
                const id = `${fromValue}_${toValue}`;

                const hit = activeFacets.find((val) => {
                    const { valMin, valMax } = val;
                    const selectedMin = parseInt(valMin);
                    const selectedMax = parseInt(valMax);
                    return selectedMin >= fromValue && selectedMax <= toValue;
                });

                if (hit) {
                    currentFacetObj['valMin'] = hit.valMin;
                    currentFacetObj['valMax'] = hit.valMax;
                    return {
                        ...hit,
                        ...facetitem,
                        facetName,
                        isSelected: true,
                        id,
                    };
                } else {
                    return { ...facetitem, facetName, id };
                }
            });
            currentFacetObj['values'] = values;
            return currentFacetObj;
        } else {
            const { start, end } = facetObj;
            const sliderMin = start;
            const sliderMax = end;
            const currentFacetObj = {
                ...facetObj,
                isOpen: true,
                facetType: facetTypes.RANGE_FACET,
                sliderMin,
                sliderMax,
                viewLess: false,
                className: 'UNX-facet__list',
            };
            const values = currentFacetObj.values.map((facetitem) => {
                const { from, end } = facetitem;
                const { dataId: fromValue } = from;
                const { dataId: toValue } = end;
                const id = `${fromValue}_${toValue}`;
                return {
                    ...facetitem,
                    facetName,
                    id,
                };
            });
            currentFacetObj['values'] = values;
            return currentFacetObj;
        }
    });

    return formattedFacets;
};

export const getUpdatedRangeFacets = (
    rangeFacets,
    existingRangeValues = {}
) => {
    if (Object.keys(rangeFacets).length > 0) {
        Object.keys(existingRangeValues).map((facetName) => {
            const currentFacet = existingRangeValues[facetName];
            rangeFacets[facetName]['isOpen'] = currentFacet
                ? currentFacet['isOpen']
                : true;
        });
    }
    return rangeFacets;
};

export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later,wait);
        if (callNow) func.apply(context, args);
    };
};

export const executeCallback = (callback, parameters, onFinish) => {
    if (typeof callback === 'function') {
        if (callback(...parameters)) {
            onFinish();
        }
    } else {
        onFinish();
    }
};

export const getRangeFacetCoreMethods = (unbxdCore) => {
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
