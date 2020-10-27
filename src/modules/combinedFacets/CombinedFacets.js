import React from 'react';
import PropTypes from 'prop-types';
import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import CombinedFacetsContainer from './CombinedFacetsContainer';

/**
 * Component to render combined facets.
 * Facets can be applied at once.
 */

const CombinedFacets = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(CombinedFacets.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    unbxdState,
                    priceUnit,
                } = appState;
                const { enableApplyFilters, selectedFacets } = unbxdState;

                return (
                    <CombinedFacetsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        enableApplyFilters={enableApplyFilters}
                        selectedFacets={selectedFacets}
                        priceUnit={priceUnit}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

CombinedFacets.displayName = 'CombinedFacets';

CombinedFacets.defaultProps = {
    collapsible: false,
    searchable: false,
    enableViewMore: false,
    minViewMore: 3,
    enableViewMore: true
};

CombinedFacets.propTypes = {
    /**
     * Min value for viewMore to be enabled.
     */
    minViewMore: PropTypes.number,
    /**
     * Bool value to enable disable viewMore.
     */
    enableViewMore: PropTypes.bool,
    /**
     * Collapse facet values
     */
    collapsible: PropTypes.bool,
    /**
     * Search facet values
     */
    searchable: PropTypes.bool,
    /**
     * Custom Text Facet item component
     */
    TextFacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    /**
     * Custom Range Facet item component
     */
    RangeFacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    /**
     * Custom transform method
     */
    transform: PropTypes.func,
    /**
     * Label for the component.
     */
    label: PropTypes.node,
    /**
     * Callback for facet click.
     */
    onFacetClick: PropTypes.node,
};

export default CombinedFacets;
