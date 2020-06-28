import { searchStatus } from '../config';

export const conditionalRenderer = (children, state, DefaultComponents, LoaderRender) => {
    const isChildren = children ? true : false;
    const { data: { unbxdCoreStatus = searchStatus.READY, showLoader } } = state;

    if (unbxdCoreStatus === searchStatus.LOADING && showLoader && LoaderRender) {
        return (LoaderRender);
    }

    return isChildren ?
        (typeof children === 'function' ?
            children(state) : children) :
        (DefaultComponents)
}


export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        const context = this, args = arguments;
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

export const isContext = (componentName = 'Component') => {
    throw new Error(`${componentName} must be used within UnbxdSearchWrapper.`);
}


export const tryCatchHandler = function (func, onCatch) {
    return function () {
        try {
            return func.apply(this, arguments);
        } catch (e) {
            onCatch(e);
        }
    }
}
