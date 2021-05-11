import React from 'react';
import { isElement, cloneElement } from '../../common/utils';

const PageNavigationOptions = (
    currentPage,
    padding,
    noOfPages,
    PageElement,
    onClick,
    type
) => {
    // init an array with noOfPages
    // slice it according to requirements
    const calcIndex = currentPage - padding;
    const lowestIndex = calcIndex < 0 ? 0 : calcIndex;
    const prevPages = [...Array(noOfPages).keys()]
        .slice(lowestIndex, currentPage)
        .map((item) => {
            return item > 0 ? (
                isElement(PageElement) ? (
                    cloneElement(PageElement, {
                        itemData: { pageNumber: item, type },
                        onClick: onClick,
                        key: item
                    })
                ) : (
                    <PageElement
                        className="UNX-pageNavigation__button"
                        onClick={onClick}
                        data-pagenumber={item}
                        key={item}
                        data-testid={`UNX_pageNumber${item}`}
                    >
                        {item}
                    </PageElement>
                )
            ) : null;
        });

    const nextPages = [...Array(noOfPages + 1).keys()]
        .slice(1)
        .slice(currentPage, currentPage + padding)
        .map((item) => {
            return isElement(PageElement) ? (
                cloneElement(PageElement, {
                    itemData: { pageNumber: item, type },
                    onClick: onClick,
                    key: item
                })
            ) : (
                <PageElement
                    className="UNX-pageNavigation__button"
                    onClick={onClick}
                    data-pagenumber={item}
                    key={item}
                    data-testid={`UNX_pageNumber${item}`}
                >
                    {item}
                </PageElement>
            );
        });

    return { prevPages, nextPages };
};

export default PageNavigationOptions;
