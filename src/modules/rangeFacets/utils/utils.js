import { facetTypes } from '../../../config';

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
            selectedRangeFacets[facetName].push({
                facetName,
                valMin: parseInt(valMin),
                valMax: parseInt(valMax),
                dataId: `${facetName}_${valMin}_${valMax}`
            });
        });
    });

    return selectedRangeFacets;
};

export const getFormattedRangeFacets = (rangeFacets, selectedRangeFacets) => {
    const formattedFacets = rangeFacets.map((facetObj) => {
        const { facetName } = facetObj;

        if (
            selectedRangeFacets[facetName] &&
            selectedRangeFacets[facetName].length
        ) {
            const { start, end } = facetObj;
            const sliderMin = start;
            const sliderMax = end;
            const { valMin = sliderMin, valMax = sliderMax } =
                selectedRangeFacets[facetName][0] || {};
            const currentFacetObj = {
                ...facetObj,
                facetType: facetTypes.RANGE_FACET,
                sliderMax,
                sliderMin,
                valMin: parseInt(valMin),
                valMax: parseInt(valMax),
                isSelected: true,
                viewLess: false,
                dataId: `${facetName}_${valMin}_${valMax}`
            };
            const activeFacets = selectedRangeFacets[facetName];
            const values = currentFacetObj.values.map((facetitem) => {
                const { from, end } = facetitem;
                const { dataId: fromValue } = from;
                const { dataId: toValue } = end;
                const dataId = `${facetName}_${fromValue}_${toValue}`;

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
                        dataId
                    };
                }
                return { ...facetitem, facetName, dataId };
            });
            currentFacetObj['values'] = values;
            return currentFacetObj;
        }
        const { start, end } = facetObj;
        const sliderMin = start;
        const sliderMax = end;
        const currentFacetObj = {
            ...facetObj,
            isOpen: true,
            facetType: facetTypes.RANGE_FACET,
            sliderMin,
            sliderMax,
            valMin: sliderMin,
            valMax: sliderMax,
            viewLess: false,
            dataId: `${facetName}_${sliderMin}_${sliderMax}`
        };
        const values = currentFacetObj.values.map((facetitem) => {
            const { from, end } = facetitem;
            const { dataId: fromValue } = from;
            const { dataId: toValue } = end;
            const dataId = `${facetName}_${fromValue}_${toValue}`;
            return {
                ...facetitem,
                facetName,
                dataId
            };
        });
        currentFacetObj['values'] = values;
        return currentFacetObj;
    });

    return formattedFacets;
};

export const getRangeFacetCoreMethods = (unbxdCore) => {
    const getRangeFacets = unbxdCore.getRanges.bind(unbxdCore);
    const setRangeFacet = unbxdCore.setRangeFacet.bind(unbxdCore);
    const applyRangeFacet = unbxdCore.applyRangeFacet.bind(unbxdCore);
    const clearARangeFacet = unbxdCore.clearARangeFacet.bind(unbxdCore);
    const lastSelectedRangeFacets = unbxdCore.state.rangeFacet;
    const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
    const getResults = unbxdCore.getResults.bind(unbxdCore);

    return {
        getRangeFacets,
        setRangeFacet,
        applyRangeFacet,
        clearARangeFacet,
        lastSelectedRangeFacets,
        setPageStart,
        getResults
    };
};
