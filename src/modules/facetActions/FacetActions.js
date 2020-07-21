import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import FacetActionsContainer from './FacetActionsContainer';

/**
 * Component to manage facet actions. 
 */
const FacetActions = (props) => {

    return (<AppContextConsumer>
        {(appState) => {

            if (appState === undefined) {
                hasUnbxdSearchWrapperContext(FacetActions.displayName);
            }

            const { unbxdCore, unbxdCoreStatus, helpers, unbxdState } = appState;
            const { selectedFacets } = unbxdState;

            return (<FacetActionsContainer
                unbxdCore={unbxdCore}
                unbxdCoreStatus={unbxdCoreStatus}
                helpers={helpers}
                selectedFacets={selectedFacets}
                {...props}
            />)
        }}
    </AppContextConsumer>)
}

FacetActions.displayName = "FacetActions"

FacetActions.defaultProps = {
    showApplyFilter: true,
    showClearFilter: true
}

FacetActions.propTypes = {
    /**
    * Enable apply facets.
    */
    showApplyFilter: PropTypes.bool,
    /**
    * Enable clear all facets.
    */
    showClearFilter: PropTypes.bool,
    /**
    * Custom apply filter component.
    */
    ApplyFilterComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Custom clear filter component.
    */
    ClearFilterComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default FacetActions;
