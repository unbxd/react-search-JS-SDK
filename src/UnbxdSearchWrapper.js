import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnbxdSearch from '@unbxd-ui/unbxd-search-core';

import { AppContextProvider } from './common/context';
import {
    searchConfigurations as defaultSearchConfigurations,
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
    setMultilevelFacetsConfiguration,
    setRangeFacetsConfiguration,
    setFacetsActionConfiguration,
    setViewTypeConfiguration,
    manageTextFacets,
    manageRangeFacets,
    unbxdCallBack,
    getActiveFacets,
    handleViewTypeClick,
    getUpdatedResults,
    resetSearch,
    getAnalytics,
    getStateString
} from './utils';
import { cloneElement } from './common/utils';
import '../public/css/core/index.scss';
import { viewTypes } from './config/constants';

/**
 * Component to initialize Unbxd Search. UnbxdSearchWrapper also acts as a root component for modules such as Products, Pagination and facets.
 */
const initialUnbxdState = {
    viewType: 'GRID',
    paginationType: paginationTypes.FIXED_PAGINATION,
    enableApplyFilters: false,
    selectedTextFacets: { add: {}, remove: {}, list: {} },
    selectedRangeFacets: { add: {}, remove: {}, list: {} },
    applyMultiple: false,
    pageSize: 10,
    sort: '',
    query: ''
};

class UnbxdSearchWrapper extends Component {
    constructor(props) {
        super(props);
        const {
            siteKey,
            apiKey,
            searchConfigurations,
            getCategoryId,
            productType,
            priceUnit
        } = this.props;

        if (!UnbxdSearch.prototype.getStateString) {
            UnbxdSearch.prototype.getStateString = getStateString;
        }
        this.unbxdCallBack = unbxdCallBack.bind(this);
        this.setPageSizeConfiguration = setPageSizeConfiguration.bind(this);
        this.setSortConfiguration = setSortConfiguration.bind(this);
        this.setMultilevelFacetsConfiguration = setMultilevelFacetsConfiguration.bind(
            this
        );
        this.setRangeFacetsConfiguration = setRangeFacetsConfiguration.bind(
            this
        );
        this.setFacetsActionConfiguration = setFacetsActionConfiguration.bind(
            this
        );
        this.setProductConfiguration = setProductConfiguration.bind(this);
        this.setSearchBoxConfiguration = setSearchBoxConfiguration.bind(this);
        this.setSpellCheckConfiguration = setSpellCheckConfiguration.bind(this);
        this.setViewTypeConfiguration = setViewTypeConfiguration.bind(this);
        this.manageTextFacets = manageTextFacets.bind(this);
        this.manageRangeFacets = manageRangeFacets.bind(this);
        this.handleViewTypeClick = handleViewTypeClick.bind(this);
        this.getUpdatedResults = getUpdatedResults.bind(this);
        this.resetSearch = resetSearch.bind(this);
        this.getAnalytics = getAnalytics.bind(this);

        this.state = {
            unbxdCore: new UnbxdSearch({
                ...defaultSearchConfigurations,
                ...searchConfigurations,
                siteKey,
                apiKey,
                onEvent: this.unbxdCallBack,
                getCategoryId
            }),
            productType,
            categoryId: '',
            unbxdState: initialUnbxdState,
            unbxdCoreStatus: searchStatus.READY,
            enableUnbxdAnalytics: searchConfigurations.enableUnbxdAnalytics,
            helpers: {
                setProductConfiguration: this.setProductConfiguration,
                setSearchBoxConfiguration: this.setSearchBoxConfiguration,
                setPageSizeConfiguration: this.setPageSizeConfiguration,
                setSortConfiguration: this.setSortConfiguration,
                setMultilevelFacetsConfiguration: this
                    .setMultilevelFacetsConfiguration,
                setRangeFacetsConfiguration: this.setRangeFacetsConfiguration,
                setFacetsActionConfiguration: this.setFacetsActionConfiguration,
                setSpellCheckConfiguration: this.setSpellCheckConfiguration,
                setViewTypeConfiguration: this.setViewTypeConfiguration,
                manageTextFacets: this.manageTextFacets,
                manageRangeFacets: this.manageRangeFacets,
                handleViewTypeClick: this.handleViewTypeClick,
                getUpdatedResults: this.getUpdatedResults,
                resetSearch: this.resetSearch,
                getAnalytics: this.getAnalytics,
                getActiveFacets
            },
            priceUnit
        };

        this.initialResultLoad = true;
    }

    componentDidMount() {
        const { unbxdCore } = this.state;
        const { trackCategory } = this.getAnalytics();
        const categoryId =
            typeof unbxdCore.options.getCategoryId === 'function' &&
            unbxdCore.options.getCategoryId();

        const viewType =
            this.state.unbxdCore.getQueryParams()['viewType'] || viewTypes.GRID;
        unbxdCore.options.extraParams['viewType'] = viewType;

        if (unbxdCore.options.applyMultipleFilters) {
            this.setState((currentState) => {
                return {
                    ...currentState,
                    unbxdState: {
                        ...currentState.unbxdState,
                        enableApplyFilters: true
                    }
                };
            });
        }

        if (
            categoryId &&
            typeof categoryId === 'string' &&
            categoryId.length > 0
        ) {
            this.setState((currentState) => {
                return {
                    ...currentState,
                    categoryId,
                    productType: productTypes.CATEGORY
                };
            });
            unbxdCore.options.productType = productTypes.CATEGORY;
            unbxdCore.getResults();
            trackCategory(window.UnbxdAnalyticsConf);
        }

        if (unbxdCore.options.hashMode) {
            window.onhashchange = unbxdCore.onLocationChange.bind(unbxdCore);
        }
    }

    componentDidUpdate(prevProps) {
        const { refreshId } = prevProps;
        const { productType, onRouteChange } = this.props;
        const {
            unbxdCore,
            categoryId,
            unbxdState: { query }
        } = this.state;
        const { trackCategory } = this.getAnalytics();

        const urlParams = unbxdCore.getQueryParams();
        const getResults = unbxdCore.getResults.bind(unbxdCore);
        const renderFromUrl = unbxdCore.renderFromUrl.bind(unbxdCore);
        const currentCategoryId =
            typeof unbxdCore.options.getCategoryId === 'function' &&
            unbxdCore.options.getCategoryId();

        if (
            categoryId !== currentCategoryId &&
            productType === productTypes.CATEGORY &&
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
            if (categoryId.length === 0 && Object.keys(urlParams).length) {
                renderFromUrl();
            } else {
                this.resetSearch();
                getResults();
            }
            trackCategory(window.UnbxdAnalyticsConf);
        } else if (
            unbxdCore.getResponseObj() === null &&
            urlParams[unbxdCore.options.searchQueryParam]
        ) {
            renderFromUrl();
        } else if (refreshId !== this.props.refreshId) {
            this.resetSearch();
            if (onRouteChange(unbxdCore, '', refreshId)) {
                unbxdCore.options.productType = productType;
                const currentQuery =
                    urlParams[unbxdCore.options.searchQueryParam];
                if (productType === productTypes.SEARCH) {
                    getResults(currentQuery);
                } else {
                    getResults();
                }
            }
        }
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

    static getDerivedStateFromProps(props, state) {
        if (props.productType !== state.productType) {
            return { productType: props.productType };
        }

        return null;
    }

    render() {
        const { unbxdCoreStatus } = this.state;
        const { loaderComponent, errorComponent } = this.props;

        return (
            <>
                {unbxdCoreStatus === searchStatus.LOADING &&
                    loaderComponent &&
                    cloneElement(loaderComponent)}

                {unbxdCoreStatus === searchStatus.ERROR &&
                    errorComponent &&
                    cloneElement(errorComponent)}

                <AppContextProvider value={this.getProps()}>
                    {this.props.children}
                </AppContextProvider>
            </>
        );
    }
}

UnbxdSearchWrapper.defaultProps = {
    productType: 'SEARCH',
    priceUnit: '$',
    searchConfigurations: {}
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
    priceUnit: PropTypes.string,
    /**
     * custom loader component.
     */
    loaderComponent: PropTypes.element,
    /**
     * custom error component instance.
     */
    errorComponent: PropTypes.element,
    /**
     * id to trigger a refresh.
     */
    refreshId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * search configurations object.
     */
    searchConfigurations: PropTypes.object,
    /**
     * callback to handle routes.
     */
    onRouteChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UnbxdSearchWrapper;
