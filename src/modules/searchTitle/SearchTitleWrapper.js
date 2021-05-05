import React from 'react';
import PropTypes from 'prop-types';
import { cloneElement, executeCallback } from '../../common/utils';
import { paginationTypes } from '../../config';

const SearchTitleWrapper = (props) => {
    const {
        searchQuery,
        start,
        productsLn,
        searchTitleItem,
        numberOfProducts,
        productType,
        paginationType,
        formatter
    } = props;

    if (searchQuery.length === 0 && numberOfProducts === 0) {
        return null;
    }

    let formattedQuery = searchQuery;
    const onFinish = (_formattedQuery) => {
        if (_formattedQuery) {
            formattedQuery = _formattedQuery;
        }
    };
    executeCallback(formatter, [searchQuery, productType], onFinish);

    const startProduct =
        paginationType === paginationTypes.FIXED_PAGINATION ? start + 1 : 1;

    return searchTitleItem ? (
        cloneElement(searchTitleItem, { ...props })
    ) : (
        <div className="UNX-searchTitle__container">
            Showing results for
            <span className="-query"> {formattedQuery}</span>
            {numberOfProducts !== 0 && (
                <span className="-pageDescription">
                    - {startProduct} to {start + productsLn} of{' '}
                    {numberOfProducts} products
                </span>
            )}
        </div>
    );
};

SearchTitleWrapper.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    start: PropTypes.number,
    productsLn: PropTypes.number,
    numberOfProducts: PropTypes.number.isRequired,
    searchTitleItem: PropTypes.element,
    productType: PropTypes.string.isRequired,
    paginationType: PropTypes.string.isRequired,
    formatter: PropTypes.func
};

export default SearchTitleWrapper;
