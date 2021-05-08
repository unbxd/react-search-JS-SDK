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
                    productType
                } = appState;
                const {
                    enableApplyFilters,
                    selectedTextFacets,
                    selectedRangeFacets
                } = unbxdState;

                return (
                    <CombinedFacetsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        productType={productType}
                        enableApplyFilters={enableApplyFilters}
                        selectedTextFacets={selectedTextFacets}
                        selectedRangeFacets={selectedRangeFacets}
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
    minViewMore: 3
};

CombinedFacets.propTypes = {
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
     * Apply multiple filters on the same facet
     */
    applyMultiple: PropTypes.bool,
    /**
     * Custom Text Facet item component instance
     */
    textFacetItemComponent: PropTypes.element,
    /**
     * Custom Range Facet item component instance
     */
    rangeFacetItemComponent: PropTypes.element,
    /**
     * Custom Multilevel Facet item component instance
     */
    multilevelFacetItemComponent: PropTypes.element,
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

export default CombinedFacets;
