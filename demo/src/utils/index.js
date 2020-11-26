export const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

export const srollTopIE = () => {
    document.documentElement.scrollTop = x;
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
