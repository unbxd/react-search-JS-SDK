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
        if (callback(...parameters)) {
            onFinish();
        }
    } else {
        onFinish();
    }
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
