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

                const { unbxdCore, unbxdCoreStatus, helpers } = appState;

                return (
                    <MultilevelFacetsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

MultilevelFacets.displayName = 'MultilevelFacets';

MultilevelFacets.defaultProps = {
    defaultCategoryFilter: '',
    facetDepth: 6,
    facetLimit: 100,
    collapsible: false,
    searchable: false,
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
     * Default category filter
     */
    defaultCategoryFilter: PropTypes.string,
    /**
     * Collapse facet values
     */
    collapsible: PropTypes.bool,
    /**
     * Search facet values
     */
    searchable: PropTypes.bool,
    /**
     * Custom Multilevel facet component
     */
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    /**
     * Label for the component.
     */
    label: PropTypes.node,
    /**
     * Callback for facet click.
     */
    onFacetClick: PropTypes.node,
};

export default MultilevelFacets;
