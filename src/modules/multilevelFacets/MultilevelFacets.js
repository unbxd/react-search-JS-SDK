import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import MultilevelFacetsContainer from './MultilevelFacetsContainer';

/**
 * Component to manage multilevel categories.
 */
const MultilevelFacets = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(MultilevelFacets.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    productType
                } = appState;

                return (
                    <MultilevelFacetsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        productType={productType}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

MultilevelFacets.displayName = 'MultilevelFacets';

MultilevelFacets.defaultProps = {
    collapsible: false,
    searchable: false,
    minViewMore: 3,
    enableViewMore: false
};

MultilevelFacets.propTypes = {
    /**
     * Collapse facet values
     */
    collapsible: PropTypes.bool,
    /**
     * Search facet values
     */
    searchable: PropTypes.bool,
    /**
     * Min value for viewMore to be enabled.
     */
    minViewMore: PropTypes.number,
    /**
     * Bool value to enable/disable viewMore.
     */
    enableViewMore: PropTypes.bool,
    /**
     * Custom facet element
     */
    facetItemComponent: PropTypes.element,
    /**
     * Label for the module.
     */
    label: PropTypes.node,
    /**
     * Callback for facet change.
     */
    onFacetClick: PropTypes.func
};

export default MultilevelFacets;
