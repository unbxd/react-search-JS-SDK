import React from 'react';

const PageNavigationOptions = (
  currentPage,
  padding,
  noOfPages,
  PageElement,
  onClick,
  type
) => {
  //init an array with noOfPages
  //slice it according to requirements
  const calcIndex = currentPage - padding;
  const lowestIndex = calcIndex < 0 ? 0 : calcIndex;
  const prevPages = [...Array(noOfPages).keys()]
    .slice(lowestIndex, currentPage)
    .map(item => {
      return item > 0 ? (
        <PageElement
          className="UNX-pageNavigation__button"
          data-pagenumber={item}
          pagenumber={item}
          onClick={onClick}
          type={type}
          label={item}
          key={item}
        >
          {item}
        </PageElement>
      ) : null;
    });

  const nextPages = [...Array(noOfPages + 1).keys()]
    .slice(1)
    .slice(currentPage, currentPage + padding)
    .map(item => {
      return (
        <PageElement
          className="UNX-pageNavigation__button"
          data-pagenumber={item}
          pagenumber={item}
          onClick={onClick}
          type={type}
          label={item}
          key={item}
        >
          {item}
        </PageElement>
      );
    });

  return { prevPages, nextPages };
};

export default PageNavigationOptions;
