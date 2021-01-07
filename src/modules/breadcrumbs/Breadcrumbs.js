import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import BreadcrumbsContainer from './BreadcrumbsContainer';

/**
 * Component to manage the breadcrumb.
 */
const Breadcrumbs = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(Breadcrumbs.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    productType
                } = appState;

                return (
                    <BreadcrumbsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        productType={productType}
                        helpers={helpers}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.defaultProps = {};

Breadcrumbs.propTypes = {
    /**
     * root of the breadcrumb.
     */
    root: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    /**
     * Separator of the breadcrumb.
     */
    separator: PropTypes.node,
    /**
     * Custom breadcrumb component instance.
     */
    breadcrumbItemComponent: PropTypes.element,
    /**
     * Callback for breadcrumb click.
     */
    onBreadcrumbClick: PropTypes.func
};

export default Breadcrumbs;
