import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import PaginationWrapper from './PaginationWrapper';

class PaginationContainer extends React.PureComponent {
  getPaginationProps() {
    const { unbxdCore, PaginationItemComponent } = this.props;
    const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
    const getResults = unbxdCore.getResults.bind(unbxdCore);

    const { padding,paginationType } = this.props;

    const {
      currentPage = 0,
      isNext = false,
      isPrev = false,
      noOfPages = 0,
      rows = 0
    } = unbxdCore.getPaginationInfo() || {};

    const onNextPageClick = () => {
      const newPageNumber = rows * currentPage;
      setPageStart(newPageNumber);
      getResults();
    };

    const onPreviousPageClick = () => {
      const newPageNumber = (currentPage - 2) * rows;
      setPageStart(newPageNumber);
      getResults();
    };

    const onPageClick = event => {
      const pageNo = parseInt(event.target.dataset.pagenumber);
      const newPageNumber = (pageNo - 1) * rows;
      setPageStart(newPageNumber);
      getResults();
    };

    const data = {
      isNext,
      isPrev,
      noOfPages,
      currentPage,
      padding,
      paginationType
    };

    const helpers = {
      onNextPageClick,
      onPreviousPageClick,
      onPageClick,
      PaginationItemComponent
    };

    return { ...data, ...helpers };
  }

  render() {
    const DefaultRender = PaginationWrapper;

    return conditionalRenderer(
      this.props.children,
      this.getPaginationProps(),
      DefaultRender
    );
  }
}

PaginationContainer.propTypes = {
  unbxdCore: PropTypes.object.isRequired,
  unbxdCoreStatus: PropTypes.string.isRequired,
  helpers: PropTypes.object.isRequired,
  padding: PropTypes.number,
  PaginationItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  paginationType:PropTypes.string.isRequired,
};

export default PaginationContainer;
