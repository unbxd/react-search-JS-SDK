import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import RangeFacetsContainer from './RangeFacetsContainer';

/**
 * Component to manage range facets.
 */
const RangeFacets = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(RangeFacets.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    unbxdState,
                    priceUnit,
                } = appState;
                const { enableApplyFilters } = unbxdState;

                return (
                    <RangeFacetsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        enableApplyFilters={enableApplyFilters}
                        priceUnit={priceUnit}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

RangeFacets.displayName = 'RangeFacets';

RangeFacets.defaultProps = {
    collapsible: true,
    minViewMore: 3,
    enableViewMore: false,
    applyMultiple: false,
};

RangeFacets.propTypes = {
    /**
     * apply multiple filters on the same facet
     */
    applyMultiple: PropTypes.bool,
    /**
     * Collapse facet values
     */
    collapsible: PropTypes.bool,
    /**
     * Label for the component.
     */
    label: PropTypes.node,
    /**
     * Callback for facet click.
     */
    onFacetClick: PropTypes.node,
    /**
     * Min value for viewMore to be enabled.
     */
    minViewMore: PropTypes.number,
    /**
     * Bool value to enable disable viewMore.
     */
    enableViewMore: PropTypes.bool,
    /**
     * Custom facet item component.
     */
    facetItemComponent: PropTypes.element,
};

export default RangeFacets;
