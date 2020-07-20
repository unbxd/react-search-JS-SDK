import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getFacetCoreMethods } from './utils';
import { manageStateTypes } from '../../config';
import FacetActionsWrapper from './FacetActionsWrapper';

class FacetActionsContainer extends React.PureComponent {
  componentDidMount() {
    const {
      helpers: { setFacetsActionConfiguration }
    } = this.props;
    setFacetsActionConfiguration({ enable: true });
  }

  //a way to pass data to render props and our component
  getFacetActionsProps() {
    const {
      unbxdCore,
      showApplyFilter,
      showClearFilter,
      ApplyFilterComponent,
      ClearFilterComponent,
      selectedFacets,
      helpers: { manageTextFacets }
    } = this.props;

    const {
      applyFacets,
      clearFacets,
      selectedRangeFacets,
      clearARangeFacet,
      getPaginationInfo
    } = getFacetCoreMethods(unbxdCore);

    const { noOfPages = 0 } = getPaginationInfo() || {};

    const onApplyFilter = () => {
      applyFacets(selectedFacets);
    };

    const onClearFilter = () => {
      Object.keys(selectedRangeFacets).map(rangeFacetName => {
        clearARangeFacet(rangeFacetName);
      });
      clearFacets();
      manageTextFacets(null, null, null, manageStateTypes.CLEAR);
    };

    return {
      showApplyFilter,
      showClearFilter,
      onApplyFilter,
      onClearFilter,
      noOfPages,
      ApplyFilterComponent,
      ClearFilterComponent
    };
  }

  render() {
    const DefaultRender = FacetActionsWrapper;

    return conditionalRenderer(
      this.props.children,
      this.getFacetActionsProps(),
      DefaultRender
    );
  }
}

FacetActionsContainer.propTypes = {
  unbxdCore: PropTypes.object.isRequired,
  unbxdCoreStatus: PropTypes.string.isRequired,
  helpers: PropTypes.object.isRequired,
  selectedFacets: PropTypes.object,
  showApplyFilter: PropTypes.bool,
  showClearFilter: PropTypes.bool,
  ApplyFilterComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  ClearFilterComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default FacetActionsContainer;
