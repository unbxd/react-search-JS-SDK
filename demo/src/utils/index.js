export const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

export const srollTopIE = () => {
    document.documentElement.scrollTop = x
};