import React from 'react';

import { SearchTitle } from '../../../src/index';

export const SearchTitleItem = (props) => {
    const { searchQuery, start, productsLn, numberOfProducts } = props;
    return (
        <div>
            Showing results for {searchQuery} - {start + 1} to{' '}
            {start + productsLn} of {numberOfProducts} products
        </div>
    );
};

export const formatter = (query, productType) => {
    if (productType === 'CATEGORY') {
        const formattedQuery = query.replace('categoryPath:', '');
        return formattedQuery;
    }
    return query;
};

const SearchDescription = () => {
    return <SearchTitle formatter={formatter} />;
};

export default SearchDescription;
