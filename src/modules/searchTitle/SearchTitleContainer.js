import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import SearchTitleWrapper from './SearchTitleWrapper';

const SearchTitleContainer = memo((props) => {
    const {
        unbxdCore,
        searchTitleItem,
        paginationType,
        productType,
        formatter
    } = props;

    const searchQuery = unbxdCore.getSearchQuery() || '';
    const { start, productsLn, numberOfProducts = 0 } =
        unbxdCore.getPaginationInfo() || {};

    const getSearchTitleProps = () => {
        return {
            searchQuery,
            start,
            productsLn,
            searchTitleItem,
            numberOfProducts,
            productType,
            paginationType,
            formatter
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
    searchTitleItem: PropTypes.element,
    productType: PropTypes.string.isRequired,
    paginationType: PropTypes.string.isRequired,
    formatter: PropTypes.func
};

export default SearchTitleContainer;
