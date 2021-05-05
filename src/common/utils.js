// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { searchStatus } from '../config';

export const conditionalRenderer = (
    children,
    state,
    DefaultComponent,
    LoaderRender
) => {
    const isChildren = !!children;
    const { unbxdCoreStatus = searchStatus.READY, showLoader } = state;

    if (
        unbxdCoreStatus === searchStatus.LOADING &&
        showLoader &&
        LoaderRender
    ) {
        return LoaderRender;
    }

    return isChildren ? (
        typeof children === 'function' ? (
            children(state)
        ) : (
            children
        )
    ) : (
        <DefaultComponent {...state} />
    );
};

export const executeCallback = (callback, parameters, onFinish) => {
    if (typeof callback === 'function') {
        const result = callback(...parameters);
        if (result) {
            onFinish(result);
        }
    } else {
        onFinish();
    }
};

export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export const hasUnbxdSearchWrapperContext = (componentName = 'Component') => {
    throw new Error(`${componentName} must be used within UnbxdSearchWrapper.`);
};

export const tryCatchHandler = function (func, onCatch) {
    return function () {
        try {
            return func.apply(this, arguments);
        } catch (e) {
            onCatch(e);
        }
    };
};

export const isElement = (element) => {
    return React.isValidElement(element);
};

export const cloneElement = (elements, props) => {
    return React.cloneElement(elements, props);
};

export const mergeFacets = (
    selectedFacets,
    lastSelectedFacets,
    applyMultiple = true
) => {
    const modifiedSelectedFacets = { ...lastSelectedFacets };
    // remove from modifiedSelectedFacets
    Object.keys(lastSelectedFacets).map((facetName) => {
        const removeFacetItems = selectedFacets.remove[facetName] || [];

        modifiedSelectedFacets[facetName] = lastSelectedFacets[
            facetName
        ].filter(
            (fValue) =>
                !removeFacetItems.find(
                    (fValueRemove) => fValue.dataId === fValueRemove.dataId
                )
        );
    });

    // add to modifiedSelectedFacets
    Object.keys(selectedFacets.add).map((fName) => {
        const addFacetItems = selectedFacets.add[fName] || [];
        if (applyMultiple) {
            modifiedSelectedFacets[fName] = [
                ...(modifiedSelectedFacets[fName] || []),
                ...addFacetItems
            ];
        } else {
            modifiedSelectedFacets[fName] = [...addFacetItems];
        }
    });
    return modifiedSelectedFacets;
};
