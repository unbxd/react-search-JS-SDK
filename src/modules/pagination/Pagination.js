import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import PaginationContainer from './PaginationContainer';

/**
 * Component to manage pagination.
 */
const Pagination = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(Pagination.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    unbxdState
                } = appState;
                const { paginationType } = unbxdState;
                return (
                    <PaginationContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        paginationType={paginationType}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

Pagination.displayName = 'Pagination';

Pagination.defaultProps = {
    padding: 2
};

Pagination.propTypes = {
    /**
     * Page number padding for page navigation.
     */
    padding: PropTypes.number,
    /**
     * Custom product item component instance
     */
    paginationItemComponent: PropTypes.element,
    /**
     * Callback for page change.
     */
    onPageChange: PropTypes.func
};

export default Pagination;
