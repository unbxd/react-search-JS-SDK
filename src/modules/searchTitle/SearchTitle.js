import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import SearchTitleContainer from './SearchTitleContainer';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';

/**
 * Component to display search meta data.
 */
const SearchTitle = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(SearchTitle.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    unbxdState,
                    productType
                } = appState;
                const { paginationType } = unbxdState;

                return (
                    <SearchTitleContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        productType={productType}
                        paginationType={paginationType}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

SearchTitle.displayName = 'SearchTitle';

SearchTitle.propTypes = {
    /**
     * Custom search title item component instance.
     */
    searchTitleItem: PropTypes.element,
    /**
     * Custom search title formatter.
     */
    formatter: PropTypes.func
};

export default SearchTitle;
