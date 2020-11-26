import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import SelectedFacetsContainer from './SelectedFacetsContainer';

/**
 * Component to manage selected facets.
 */
const SelectedFacets = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(SelectedFacets.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    priceUnit,
                    helpers: { getUpdatedResults },
                    productType,
                } = appState;

                return (
                    <SelectedFacetsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        priceUnit={priceUnit}
                        getUpdatedResults={getUpdatedResults}
                        productType={productType}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

SelectedFacets.displayName = 'SelectedFacets';

SelectedFacets.propTypes = {
    /**
     * Custom facet item component.
     */
    facetItemComponent: PropTypes.element,
    /**
     * Label for the component.
     */
    label: PropTypes.node,
};

export default SelectedFacets;
