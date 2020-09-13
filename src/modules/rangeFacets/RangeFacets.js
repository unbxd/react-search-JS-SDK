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
          priceUnit
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
  displayType: 'SLIDER',
  collapsible: true
};

RangeFacets.propTypes = {
  /**
   * display type of facet component.
   */
  displayType: PropTypes.string,
  /**
   * Collapse facet values
   */
  collapsible: PropTypes.bool,
  /**
   * Search facet values
   */
  FacetSliderItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  /**
   * Custom facet list item component.
   */
  FacetListItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  /**
   * Label for the component.
   */
  label: PropTypes.node
};

export default RangeFacets;
