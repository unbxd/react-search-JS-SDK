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
    facetDepth: 6,
    facetLimit: 100,
    collapsible: false,
    searchable: false,
    minViewMore: 3,
    enableViewMore: false
};

MultilevelFacets.propTypes = {
    /**
     * Display name of the category.
     */
    categoryDisplayName: PropTypes.string.isRequired,
    /**
     * Category field in the feed.
     */
    categoryField: PropTypes.string.isRequired,
    /**
     * Maximum depth of the category.
     */
    facetDepth: PropTypes.number,
    /**
     * Maximum number of values present in a facet.
     */
    facetLimit: PropTypes.number,
    /**
     * Collapse facet values
     */
    collapsible: PropTypes.bool,
    /**
     * Search facet values
     */
    searchable: PropTypes.bool,
    /**
     * Custom facet element
     */
    facetItemComponent: PropTypes.element,
    /**
     * Label for the component.
     */
    label: PropTypes.node,
    /**
     * Callback for facet click.
     */
    onFacetClick: PropTypes.func,
    /**
     * Min value for viewMore to be enabled.
     */
    minViewMore: PropTypes.number,
    /**
     * Bool value to enable disable viewMore.
     */
    enableViewMore: PropTypes.bool
};

export default MultilevelFacets;
