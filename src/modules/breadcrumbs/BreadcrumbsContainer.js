import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getFacetCoreMethods } from './utils';
import BreadcrumbsWrapper from './BreadcrumbsWrapper';

class BreadcrumbsContainer extends React.PureComponent {
  getBreadcrumbProps() {
    const { unbxdCore, Root, separator, BreadcrumbItemComponent } = this.props;

    const {
      getBreadCrumbsList,
      deleteCategoryFilter,
      getResults
    } = getFacetCoreMethods(unbxdCore);

    const breadCrumbsList = getBreadCrumbsList();

    const removeCategoryFilter = event => {
      const {
        unx_categoryname: name,
        unx_level: level,
        unx_multilevelfield: parent
      } = event.target.dataset;
      const removeCategoryObject = { parent, level, name };
      deleteCategoryFilter(removeCategoryObject);
      getResults();
    };

    return {
      removeCategoryFilter,
      breadCrumbsList,
      Root,
      separator,
      BreadcrumbItemComponent
    };
  }

  render() {
    const DefaultRender = BreadcrumbsWrapper;

    return conditionalRenderer(
      this.props.children,
      this.getBreadcrumbProps(),
      DefaultRender
    );
  }
}

BreadcrumbsContainer.propTypes = {
  unbxdCore: PropTypes.object.isRequired,
  unbxdCoreStatus: PropTypes.string.isRequired,
  helpers: PropTypes.object.isRequired,
  Root: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node
  ]),
  separator: PropTypes.node,
  BreadcrumbItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default BreadcrumbsContainer;
