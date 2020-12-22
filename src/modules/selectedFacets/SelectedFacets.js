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
                    unbxdState,
                    priceUnit,
                    helpers: { getUpdatedResults },
                    productType,
                    helpers
                } = appState;

                const { applyMultiple } = unbxdState;

                return (
                    <SelectedFacetsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        priceUnit={priceUnit}
                        getUpdatedResults={getUpdatedResults}
                        applyMultiple={applyMultiple}
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
     * Custom facet item component instance.
     */
    facetItemComponent: PropTypes.element,
    /**
     * Label for the module.
     */
    label: PropTypes.node
};

export default SelectedFacets;
