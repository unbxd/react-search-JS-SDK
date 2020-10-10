import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer, scrollTop } from '../../common/utils';
import GenerateFacets from './GenerateFacets';
import { getFacetCoreMethods, displayTypes } from './utils';

class RangeFacetsContainer extends React.PureComponent {
  getRangeFacetsProps() {
    const {
      unbxdCore,
      FacetSliderItemComponent,
      FacetListItemComponent,
      displayType,
      enableApplyFilters,
      priceUnit,
      label,
      collapsible,
      sortRangeFacets,
      enableViewMore
    } = this.props;

    const {
      getRangeFacets,
      setRangeFacet,
      applyRangeFacet,
      clearARangeFacet,
      selectedRangeFacets
    } = getFacetCoreMethods(unbxdCore);
    const applyMultiple = displayType === displayTypes.LIST;
    const rangeFacets = getRangeFacets() || [];
    const addRangeFacet = ({ facetName, start, end }, getResults = false) => {
      setRangeFacet({ facetName, start, end, applyMultiple });
      if (getResults) {
        applyRangeFacet();
        scrollTop();
      }
    };

    const removeRangeFacet = ({ facetName }, getResults = false) => {
      clearARangeFacet(facetName);
      if (getResults) {
        applyRangeFacet();
        scrollTop();
      }
    };

    return {
      rangeFacets,
      addRangeFacet,
      applyRangeFacet,
      removeRangeFacet,
      selectedRangeFacets,
      FacetSliderItemComponent,
      FacetListItemComponent,
      displayType,
      enableApplyFilters,
      priceUnit,
      label,
      collapsible,
      sortRangeFacets,
      enableViewMore
    };
  }

  render() {
    const DefaultRender = GenerateFacets;

    return conditionalRenderer(
      this.props.children,
      this.getRangeFacetsProps(),
      DefaultRender
    );
  }
}

RangeFacetsContainer.defaultProps = {
  displayType: 'SLIDER'
};

RangeFacetsContainer.propTypes = {
  unbxdCore: PropTypes.object.isRequired,
  unbxdCoreStatus: PropTypes.string.isRequired,
  helpers: PropTypes.object.isRequired,
  FacetSliderItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  FacetListItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  displayType: PropTypes.string.isRequired,
  enableApplyFilters: PropTypes.bool.isRequired,
  priceUnit: PropTypes.string.isRequired,
  label: PropTypes.node,
  collapsible: PropTypes.bool
};

export default RangeFacetsContainer;
