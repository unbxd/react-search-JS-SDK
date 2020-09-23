import React from 'react';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import CombinedFacetsContainer from './CombinedFacetsContainer';

/**
 * Component to render combined facets. 
 * Facets can be applied at once.
 */

const CombinedFacets = (props) => {

    return (<AppContextConsumer>
        {(appState) => {

            if (appState === undefined) {
                hasUnbxdSearchWrapperContext(CombinedFacets.displayName);
            }

            const { unbxdCore, unbxdCoreStatus, helpers, unbxdState, priceUnit } = appState;
            const { enableApplyFilters, selectedFacets } = unbxdState;

            return (<CombinedFacetsContainer
                unbxdCore={unbxdCore}
                unbxdCoreStatus={unbxdCoreStatus}
                helpers={helpers}
                enableApplyFilters={enableApplyFilters}
                selectedFacets={selectedFacets}
                priceUnit={priceUnit}
                textCollapsible={true}
                textSearchable ={true}
                rangeCollapsible={true}
                displayType={'LIST'}
                {...props}
            />)
        }}
    </AppContextConsumer>)
}

CombinedFacets.displayName = "CombinedFacets"

export default CombinedFacets;
