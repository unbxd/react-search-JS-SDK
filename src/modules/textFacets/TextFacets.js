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

    return (<AppContextConsumer>
        {(appState) => {

            if (appState === undefined) {
                hasUnbxdSearchWrapperContext(TextFacets.displayName);
            }

            const { unbxdCore, unbxdCoreStatus, helpers, unbxdState } = appState;
            const { enableApplyFilters, selectedFacets } = unbxdState;

            return (<TextFacetsContainer
                unbxdCore={unbxdCore}
                unbxdCoreStatus={unbxdCoreStatus}
                helpers={helpers}
                enableApplyFilters={enableApplyFilters}
                selectedFacets={selectedFacets}
                {...props}
            />)
        }}
    </AppContextConsumer>)
}

TextFacets.displayName = "TextFacets"

TextFacets.defaultProps = {
    defaultFilters: {}
}

TextFacets.propTypes = {
    /**
    * Apply default filters which will be enabled on every request.
    */
    defaultFilters: PropTypes.object,
    /**
     * Custom Facet item component
     */
    FacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Label for the component. 
    */
    label:PropTypes.node
}

export default TextFacets;
