import React from 'react';

export const getPageNavigationOptions = (currentPage, pagePadding, noOfPages, PageElement, onClick) => {

    //init an array with noOfPages
    //slice it according to requirements
    const calcIndex = (currentPage - pagePadding);
    const lowestIndex = calcIndex < 0 ? 0 : calcIndex;
    const prevPages = [...Array(noOfPages).keys()]
        .slice(lowestIndex, currentPage)
        .map(item => {

            return item > 0 ?
                (<PageElement className='UNX-pageNavigation__button' data-pagenumber={item} onClick={onClick} key={item}>{item}</PageElement>)
                : null;

        });


    const nextPages = [...Array(noOfPages + 1).keys()]
        .slice(1)
        .slice(currentPage, (currentPage + pagePadding))
        .map(item => {

            return (<PageElement className='UNX-pageNavigation__button' data-pagenumber={item} onClick={onClick} key={item}>{item}</PageElement>);
        });

    return { prevPages, nextPages };
}
