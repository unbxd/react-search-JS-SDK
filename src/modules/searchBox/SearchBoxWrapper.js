import React from 'react';
import PropTypes from 'prop-types';

import SearchInput from './searchInput';
import SearchButton from './searchButton';

const SearchBoxWrapper = (props) => {
    const {
        autoFocus,
        clearable,
        query,
        lastSearchedQuery,
        placeholder,
        productType,
        onSearchBoxChange,
        onSearchBoxSubmit,
        onSearchBoxClear,
        setSearchBoxQuery,
        inputComponent,
        submitComponent,
        clearComponent
    } = props;
    return (
        <div className="UNX-searchbox__container">
            <form onSubmit={onSearchBoxSubmit}>
                <SearchInput
                    query={query}
                    lastSearchedQuery={lastSearchedQuery}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    clearable={clearable}
                    productType={productType}
                    onSearchBoxChange={onSearchBoxChange}
                    onSearchBoxClear={onSearchBoxClear}
                    setSearchBoxQuery={setSearchBoxQuery}
                    inputComponent={inputComponent}
                    clearComponent={clearComponent}
                />

                <SearchButton
                    onSearchBoxSubmit={onSearchBoxSubmit}
                    submitComponent={submitComponent}
                />
            </form>
        </div>
    );
};

SearchBoxWrapper.propTypes = {
    autoFocus: PropTypes.bool,
    clearable: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClear: PropTypes.func,
    showLoader: PropTypes.bool,
    inputComponent: PropTypes.element,
    submitComponent: PropTypes.element,
    clearComponent: PropTypes.element,
    defaultSearch: PropTypes.string,
    productType: PropTypes.string,
    query: PropTypes.string.isRequired,
    lastSearchedQuery: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onSearchBoxChange: PropTypes.func.isRequired,
    onSearchBoxClear: PropTypes.func.isRequired,
    setSearchBoxQuery: PropTypes.func.isRequired,
    onSearchBoxSubmit: PropTypes.func.isRequired
};

export default SearchBoxWrapper;
