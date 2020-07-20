import React from 'react';
import PropTypes from 'prop-types';

import {paginationTypes } from '../../config';

const SearchTitleWrapper = props => {
  const {
    searchQuery,
    start,
    productsLn,
    SearchTitleItem,
    numberOfProducts,
    paginationType
  } = props;

  if (searchQuery.length === 0 && numberOfProducts === 0) {
    return null;
  }
  return SearchTitleItem ? (
    <SearchTitleItem {...props} />
  ) : (
    <div className="UNBXD-searchTitle__container">
      Showing results for
      <span className="-query"> {searchQuery}</span>
      {paginationType===paginationTypes.FIXED_PAGINATION && <span className="-pageDescription">
        - {start + 1} to {start + productsLn} of {numberOfProducts} products
      </span>}
    </div>
  );
};

SearchTitleWrapper.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  start: PropTypes.number,
  productsLn: PropTypes.number,
  numberOfProducts: PropTypes.number.isRequired,
  SearchTitleItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  paginationType:PropTypes.string.isRequired,
};

export default SearchTitleWrapper;
