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
    collapsible:false,
    searchable:false,
    minViewMore: 3,
    enableViewMore: true
}

TextFacets.propTypes = {
    /**
     * Collapse facet values
     */
    collapsible:PropTypes.bool,
    /**
     * Search facet values
     */
    searchable:PropTypes.bool,
    /**
     * Custom Facet item component
     */
    FacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Label for the component. 
    */
    label:PropTypes.node,
    /**
    * Callback for facet click. 
    */
    onFacetClick:PropTypes.node,
    /**
     * Min value for viewMore to be enabled.
     */
    minViewMore: PropTypes.number,
    /**
     * Bool value to enable disable viewMore.
    */
    enableViewMore: PropTypes.bool
}

export default TextFacets;
