import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import PageSizeContainer from './PageSizeContainer';

/**
 * Component to manage the page size.
 */
const PageSize = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(PageSize.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    unbxdState,
                    helpers
                } = appState;
                const { pageSize } = unbxdState;
                return (
                    <PageSizeContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        pageSize={pageSize}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

PageSize.displayName = 'PageSize';
PageSize.defaultProps = {
    size: 10,
    sizeOptions: [
        { id: 5, value: '5' },
        { id: 10, value: '10' },
        { id: 15, value: '15' }
    ],
    displayType: 'DROPDOWN'
};

PageSize.propTypes = {
    /**
     * Number of products to load on a page.
     */
    size: PropTypes.number,
    /**
     * Options of number of products to load on a page.
     */
    sizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string })
    ),
    /**
     * Display type of `DROPDOWN` or `LIST` for pageSize.
     */
    displayType: PropTypes.string,
    /**
     * Custom size component instance.
     */
    pageSizeItemComponent: PropTypes.element,
    /**
     * Label for the module.
     */
    label: PropTypes.node
};

export default PageSize;
