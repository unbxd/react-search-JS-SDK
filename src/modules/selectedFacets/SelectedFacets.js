import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import SelectedFacetsContainer from './SelectedFacetsContainer';

/**
 * Component to manage selected facets.
 */
const SelectedFacets = props => {
  return (
    <AppContextConsumer>
      {appState => {
        if (appState === undefined) {
          hasUnbxdSearchWrapperContext(SelectedFacets.displayName);
        }

        const { unbxdCore, unbxdCoreStatus, priceUnit } = appState;

        return (
          <SelectedFacetsContainer
            unbxdCore={unbxdCore}
            unbxdCoreStatus={unbxdCoreStatus}
            priceUnit={priceUnit}
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
  FacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
    * Label for the component. 
   */
  label:PropTypes.node
};

export default SelectedFacets;
