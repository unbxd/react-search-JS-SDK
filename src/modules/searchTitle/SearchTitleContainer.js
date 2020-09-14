import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import SearchTitleWrapper from './SearchTitleWrapper';

const SearchTitleContainer = memo(props => {
  const { unbxdCore, SearchTitleItem, paginationType,productType } = props;

  const searchQuery = unbxdCore.getSearchQuery() || '';
  const { start, productsLn, numberOfProducts = 0 } =
    unbxdCore.getPaginationInfo() || {};

  const getSearchTitleProps = () => {
    return {
      searchQuery,
      start,
      productsLn,
      SearchTitleItem,
      numberOfProducts,
      productType,
      paginationType
    };
  };

  const DefaultRender = SearchTitleWrapper;

  return conditionalRenderer(
    props.children,
    getSearchTitleProps(),
    DefaultRender
  );
});

SearchTitleContainer.propTypes = {
  unbxdCore: PropTypes.object.isRequired,
  SearchTitleItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  productType:PropTypes.string.isRequired,
  paginationType:PropTypes.string.isRequired,
};

export default SearchTitleContainer;
