import React from 'react';

const GenerateSearchTitle = ({ data, helpers }) => {

    if (data === undefined) {
        return null
    }

    const { searchQuery, paginationInfo } = data;
    const { start, productsLn, numberOfProducts = 0 } = paginationInfo;

    if (searchQuery.length === 0 && numberOfProducts === 0) {
        return null;
    }
    return (<div className='UNBXD-searchTitle__container'>
        Showing results for
        <span className='-query'> {searchQuery}</span>
        <span className='-pageDescription'>- {start + 1} to {start + productsLn} of {numberOfProducts} products</span>
    </div>)

}

export default GenerateSearchTitle;
