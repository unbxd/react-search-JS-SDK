import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import SortContainer from './SortContainer';

/**
 * Component to manage the sort.
 */
const Sort = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(Sort.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    unbxdState
                } = appState;
                const { viewType, sort } = unbxdState;

                return (
                    <SortContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        viewType={viewType}
                        sort={sort}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

Sort.displayName = 'Sort';

Sort.defaultProps = {
    displayType: 'DROPDOWN'
};

Sort.propTypes = {
    /**
     * Sort options to be applied on products.
     */
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            order: PropTypes.string
        })
    ).isRequired,
    /**
     * `DROPDOWN` | `LIST`
     */
    displayType: PropTypes.string,
    /**
     * Custom sort item component instance.
     */
    sortItemComponent: PropTypes.element,
    /**
     * Label for the module.
     */
    label: PropTypes.node,
    /**
     * Callback for sort change.
     */
    onSortChange: PropTypes.func
};

export default Sort;
