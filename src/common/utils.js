export const conditionalRenderer = (children, state, DefaultComponents) => {
    const isChildren = children ? true : false;

    return isChildren ?
        (typeof children === 'function' ?
            children(state) : children) :
        (DefaultComponents)
}


export const debounce = (func, wait, immediate) => {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export const isContext = (componentName = 'Component') => {
    throw new Error(`${componentName} must be used within UnbxdSearchWrapper.`);
}
