import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getProductViewType } from './utils';
import ViewTypesWrapper from './ViewTypesWrapper';

class ViewTypesContainer extends React.PureComponent {
  componentDidMount() {
    const {
      viewTypes,
      helpers: { setViewTypeConfiguration }
    } = this.props;
    const viewType = getProductViewType(viewTypes)[0];
    setViewTypeConfiguration({ viewType });
  }

  getViewTypesProps() {
    const {
      unbxdCore,
      viewType,
      viewTypes,
      displayType,
      ViewItemComponent,
      helpers: { handleViewTypeClick }
    } = this.props;

    const { numberOfProducts = 0 } = unbxdCore.getSearchResults() || {};
    const validViewTypes = getProductViewType(viewTypes);

    return {
      viewType,
      viewTypes,
      displayType,
      ViewItemComponent,
      handleViewTypeClick,
      numberOfProducts,
      validViewTypes
    };
  }

  render() {
    const DefaultRender = ViewTypesWrapper;

    return conditionalRenderer(
      this.props.children,
      this.getViewTypesProps(),
      DefaultRender
    );
  }
}

ViewTypesContainer.propTypes = {
  unbxdCore: PropTypes.object.isRequired,
  unbxdCoreStatus: PropTypes.string.isRequired,
  helpers: PropTypes.object.isRequired,
  viewType: PropTypes.string,
  viewTypes: PropTypes.arrayOf(PropTypes.string),
  displayType: PropTypes.string,
  ViewItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default ViewTypesContainer;
