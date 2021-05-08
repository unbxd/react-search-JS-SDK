import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import TextFacetsContainer from './TextFacetsContainer';

/**
 * Component to render text facets.
 * Facets can be applied individually or at once.
 */

const TextFacets = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(TextFacets.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    unbxdState
                } = appState;
                const { enableApplyFilters, selectedTextFacets } = unbxdState;

                return (
                    <TextFacetsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        enableApplyFilters={enableApplyFilters}
                        selectedTextFacets={selectedTextFacets}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

TextFacets.displayName = 'TextFacets';

TextFacets.defaultProps = {
    collapsible: false,
    searchable: false,
    minViewMore: 3,
    enableViewMore: false
};

TextFacets.propTypes = {
    /**
     * Collapse facet values
     */
    collapsible: PropTypes.bool,
    /**
     * Search facet values
     */
    searchable: PropTypes.bool,
    /**
     * Bool value to enable/disable viewMore.
     */
    enableViewMore: PropTypes.bool,
    /**
     * Min value for viewMore to be enabled.
     */
    minViewMore: PropTypes.number,
    /**
     * Custom Facet item component instance
     */
    facetItemComponent: PropTypes.element,
    /**
     * Label for the module.
     */
    label: PropTypes.node,
    /**
     * Callback for facet change.
     */
    onFacetClick: PropTypes.func,
    /**
     * Callback to format the facets.
     */
    transform: PropTypes.func
};

export default TextFacets;
