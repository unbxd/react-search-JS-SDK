import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnbxdSearch from '@unbxd-ui/unbxd-search-core';

import { AppContextProvider } from './common/context';
import {
  searchConfigurations,
  productTypes,
  searchStatus,
  paginationTypes
} from './config';
import {
  setProductConfiguration,
  setSearchBoxConfiguration,
  setSpellCheckConfiguration,
  setPageSizeConfiguration,
  setSortConfiguration,
  setTextFacetsConfiguration,
  setMultilevelFacetsConfiguration,
  setFacetsActionConfiguration,
  setViewTypeConfiguration,
  manageTextFacets,
  unbxdCallBack,
  getActiveFacets,
  handleViewTypeClick,
  setSelectedFacets
} from './utils';
import '../public/css/core/index.scss';

/**
 * Component to initialize Unbxd Search. UnbxdSearchWrapper also acts as a root component for modules such as Products, Pagination and facets.
 */
const initialUnbxdState = {
  viewType: 'GRID',
  paginationType: paginationTypes.FIXED_PAGINATION,
  enableApplyFilters: false,
  selectedFacets: {}
};

class UnbxdSearchWrapper extends Component {
  constructor(props) {
    super(props);
    const {
      siteKey,
      apiKey,
      getCategoryId,
      productType,
      priceUnit
    } = this.props;

    this.unbxdCallBack = unbxdCallBack.bind(this);
    this.setPageSizeConfiguration = setPageSizeConfiguration.bind(this);
    this.setSortConfiguration = setSortConfiguration.bind(this);
    this.setTextFacetsConfiguration = setTextFacetsConfiguration.bind(this);
    this.setMultilevelFacetsConfiguration = setMultilevelFacetsConfiguration.bind(
      this
    );
    this.setFacetsActionConfiguration = setFacetsActionConfiguration.bind(this);
    this.setProductConfiguration = setProductConfiguration.bind(this);
    this.setSearchBoxConfiguration = setSearchBoxConfiguration.bind(this);
    this.setSpellCheckConfiguration = setSpellCheckConfiguration.bind(this);
    this.setViewTypeConfiguration = setViewTypeConfiguration.bind(this);
    this.manageTextFacets = manageTextFacets.bind(this);
    this.setSelectedFacets = setSelectedFacets.bind(this);
    this.handleViewTypeClick = handleViewTypeClick.bind(this);

    this.state = {
      unbxdCore: new UnbxdSearch({
        ...searchConfigurations,
        siteKey,
        apiKey,
        callBackFn: this.unbxdCallBack,
        getCategoryId
      }),
      productType,
      categoryId: '',
      unbxdState: initialUnbxdState,
      unbxdCoreStatus: searchStatus.READY,
      helpers: {
        setProductConfiguration: this.setProductConfiguration,
        setSearchBoxConfiguration: this.setSearchBoxConfiguration,
        setPageSizeConfiguration: this.setPageSizeConfiguration,
        setSortConfiguration: this.setSortConfiguration,
        setTextFacetsConfiguration: this.setTextFacetsConfiguration,
        setMultilevelFacetsConfiguration: this.setMultilevelFacetsConfiguration,
        setFacetsActionConfiguration: this.setFacetsActionConfiguration,
        setSpellCheckConfiguration: this.setSpellCheckConfiguration,
        setViewTypeConfiguration: this.setViewTypeConfiguration,
        manageTextFacets: this.manageTextFacets,
        setSelectedFacets: this.setSelectedFacets,
        handleViewTypeClick: this.handleViewTypeClick,
        getActiveFacets
      },
      priceUnit
    };

    this.initialResultLoad = true;
  }

  getProps() {
    const {
      unbxdCore,
      unbxdCoreStatus,
      unbxdState,
      helpers,
      priceUnit,
      productType
    } = this.state;
    return {
      unbxdCore,
      unbxdCoreStatus,
      unbxdState,
      helpers,
      priceUnit,
      productType
    };
  }

  componentDidMount() {
    const { onPageLoad } = this.props;
    const { unbxdCore } = this.state;

    const categoryId =
      typeof unbxdCore.options.getCategoryId === 'function' &&
      unbxdCore.options.getCategoryId();

    if (unbxdCore.options.applyMultipleFilters) {
      this.setState((currentState) => {
        return {
          ...currentState,
          unbxdState: { ...currentState.unbxdState, enableApplyFilters: true }
        };
      });
    }

    if (categoryId && typeof categoryId === 'string' && categoryId.length > 0) {
      this.setState((currentState) => {
        return {
          ...currentState,
          categoryId,
          productType: productTypes.CATEGORY
        };
      });
      unbxdCore.options.productType = productTypes.CATEGORY;
      unbxdCore.getResults();
    } else {
      //call onPageLoad
      typeof onPageLoad == 'function' && onPageLoad(unbxdCore.getResponseObj());
    }

    const urlParams = unbxdCore.getQueryParams();
    if (urlParams[unbxdCore.options.searchQueryParam]) {
      unbxdCore.renderFromUrl();
    }

    if (unbxdCore.options.hashMode) {
      window.onhashchange = unbxdCore.onLocationChange.bind(unbxdCore);
    }
  }

  componentDidUpdate() {
    const { onPageLoad } = this.props;
    const { unbxdCore, categoryId } = this.state;

    const currentCategoryId =
      typeof unbxdCore.options.getCategoryId === 'function' &&
      unbxdCore.options.getCategoryId();
    if (
      categoryId !== currentCategoryId &&
      typeof currentCategoryId === 'string' &&
      currentCategoryId.length > 0
    ) {
      this.setState((currentState) => {
        return {
          ...currentState,
          categoryId: currentCategoryId,
          productType: productTypes.CATEGORY
        };
      });
      unbxdCore.options.productType = productTypes.CATEGORY;
      unbxdCore.getResults();
    } else {
      //call onPageLoad
      typeof onPageLoad == 'function' && onPageLoad(unbxdCore.getResponseObj());
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.productType !== state.productType) {
      return { productType: props.productType };
    }

    return null;
  }

  render() {
    return (
      <AppContextProvider value={this.getProps()}>
        {this.props.children}
      </AppContextProvider>
    );
  }
}

UnbxdSearchWrapper.defaultProps = {
  productType: 'SEARCH',
  priceUnit: '$'
};

UnbxdSearchWrapper.propTypes = {
  /**
   * Site key of the site.
   */
  siteKey: PropTypes.string.isRequired,
  /**
   * API key of the site.
   */
  apiKey: PropTypes.string.isRequired,
  /**
   * Callback for results load.
   */
  onIntialResultLoad: PropTypes.func,
  /**
   * Callback for results mounted.
   */
  onPageLoad: PropTypes.func,
  /**
   * Custom function to return the Category Id.
   */
  getCategoryId: PropTypes.func,
  /**
   * Product type of UnbxdSearchWrapper.
   */
  productType: PropTypes.string,
  /**
   * Price unit.
   */
  priceUnit: PropTypes.string
};

export default UnbxdSearchWrapper;
