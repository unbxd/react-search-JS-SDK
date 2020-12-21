import React from 'react';

import { SearchTitle } from '@unbxd-ui/react-search-sdk';

export const SearchTitleItem = (props) => {
    const { searchQuery, start, productsLn, numberOfProducts } = props;
    return (
        <div>
            Showing results for {searchQuery} - {start + 1} to{' '}
            {start + productsLn} of {numberOfProducts} products
        </div>
    );
};

const SearchDescription = () => {
    return <SearchTitle />;
};

export default SearchDescription;
