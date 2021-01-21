import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import SearchBoxContainer from './SearchBoxContainer';

/**
 * Component to display merchandising banners.
 */
const SearchBox = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(SearchBox.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    productType,
                    unbxdState
                } = appState;

                const { query } = unbxdState;

                return (
                    <SearchBoxContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        productType={productType}
                        query={query}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

SearchBox.displayName = 'SearchBox';

SearchBox.defaultProps = {
    autoFocus: false,
    clearable: false,
    showLoader: false
};

SearchBox.propTypes = {
    /**
     * Should the searchbox be focused by default.
     */
    autoFocus: PropTypes.bool,
    /**
     * Should the searchbox be clearable.
     */
    clearable: PropTypes.bool,
    /**
     * Hook for search query. The function should return `true` if the search is to be triggered, false otherwise.
     */
    onSubmit: PropTypes.func,
    /**
     * Hook for clearing the search query. The function should return `true` if the searchbox is to be cleared, false otherwise.
     */
    onClear: PropTypes.func,
    /**
     * Should loader be shown
     */
    showLoader: PropTypes.bool,
    /**
     * Custom input component instance
     */
    inputComponent: PropTypes.element,
    /**
     * Custom submit component instance
     */
    submitComponent: PropTypes.element,
    /**
     * Custom reset component instance
     */
    clearComponent: PropTypes.element,
    /**
     * Default search query
     */
    defaultSearch: PropTypes.string,
    /**
     * SearchBox placeholder
     */
    placeholder: PropTypes.string
};

export default SearchBox;
