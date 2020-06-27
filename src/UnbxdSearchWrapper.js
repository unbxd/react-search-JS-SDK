import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnbxdSearch from '@unbxd-ui/unbxd-search-core';

import { AppContextProvider } from './common/context';
import { searchConfigurations, productTypes } from './config';
import { paginationTypes } from './modules/products/utils';
import '../public/css/core/index.scss';


/**
 * Component to initialize Unbxd Search. UnbxdSearchWrapper also acts as a root component for modules such as Products, Pagination and facets. 
 */
class UnbxdSearchWrapper extends Component {

    setProductConfiguration(config) {
        const { pageSize, requiredFields, showVariants,
            variantsCount, variantRequiredFields, groupBy, paginationType } = config;

        this.state.unbxdCore.setProductAttributes(requiredFields);
        this.state.unbxdCore.setShowVariants(showVariants);
        this.state.unbxdCore.setVariantsCount(variantsCount);
        this.state.unbxdCore.setVariantAttributes(variantRequiredFields);
        this.state.unbxdCore.setVariantsGroupBy(groupBy);

        if (paginationType === paginationTypes.INFINITE_SCROLL ||
            paginationType === paginationTypes.CLICK_N_SCROLL) {
            this.state.unbxdCore.setPageSize(pageSize);
        }
    }

    setSearchBoxConfiguration(config) {
        const { query = '*' } = config;
        const { unbxdCore } = this.state;
        unbxdCore.options.productType = productTypes.SEARCH;
        unbxdCore.getResults(query);
    }

    setPaginationConfiguration = (config, triggerResults = false) => {

        const { pageSize } = config;

        this.state.unbxdCore.setPageSize(pageSize);
        this.state.unbxdCore.setPageStart(0);

        if (triggerResults) {
            this.state.unbxdCore.getResults();
        }

    }

    setSortConfiguration = (config, triggerResults = false) => {

        const { sortBy } = config;

        if (triggerResults) {
            this.state.unbxdCore.applySort(sortBy);
        } else {
            this.state.unbxdCore.setSort(sortBy)
        }
    }

    trackActions({ type = 'unbxdAction', data = {} }) {

        this.unbxdCallBack(null, type, data);
    }


    constructor(props) {

        super(props);
        const { siteKey, apiKey, getCategoryId, productType } = this.props;

        this.unbxdCallBack = this.unbxdCallBack.bind(this);
        this.setProductConfiguration = this.setProductConfiguration.bind(this);
        this.trackActions = this.trackActions.bind(this);
        this.setSearchBoxConfiguration = this.setSearchBoxConfiguration.bind(this);

        this.state = {
            unbxdCore:
                new UnbxdSearch({
                    ...searchConfigurations,
                    siteKey,
                    apiKey,
                    callBackFn: this.unbxdCallBack,
                    getCategoryId
                }),
            productType

        };

        this.initialResultLoad = true

    }

    unbxdCallBack(unbxdSearchObj, eventName, data) {

        const { onIntialResultLoad } = this.props;

        if (eventName === 'AFTER_API_CALL') {

            if (this.initialResultLoad) {
                //call onIntialResultLoad
                typeof (onIntialResultLoad) == "function" &&
                    onIntialResultLoad(unbxdSearchObj.getResponseObj());
                this.initialResultLoad = false;
            }

            this.setState({ unbxdCore: unbxdSearchObj })
        }

        console.log("unbxdCallBack ", eventName, data);
    }

    getProps() {
        
        const helpers = {
            setProductConfiguration: this.setProductConfiguration,
            setSearchBoxConfiguration: this.setSearchBoxConfiguration,
            setPaginationConfiguration: this.setPaginationConfiguration,
            setSortConfiguration: this.setSortConfiguration,
            trackActions: this.trackActions,
        }

        return {
            ...this.state, helpers
        }
    }

    componentDidMount() {
        const { onPageLoad } = this.props;
        const { unbxdCore } = this.state;
        
        const categoryId = typeof (unbxdCore.options.getCategoryId) === 'function' && unbxdCore.options.getCategoryId();
        this.setState({ categoryId })
        if (categoryId && typeof (categoryId) === "string" && categoryId.length > 0) {

            unbxdCore.options.productType = productTypes.CATEGORY;
            unbxdCore.getResults();
        } else {

            //call onPageLoad
            typeof (onPageLoad) == "function" && onPageLoad(unbxdCore.getResponseObj());
        }

    }

    componentDidUpdate(props, state) {

        const { onPageLoad } = this.props;
        const { unbxdCore, categoryId } = this.state;

        console.log("diff ", props, this.props);
        console.log("diff ", state, this.state);
        const currentCategoryId = typeof (unbxdCore.options.getCategoryId) === 'function' && unbxdCore.options.getCategoryId();
        if (categoryId !== currentCategoryId && currentCategoryId.length > 0) {

            this.setState({ categoryId: currentCategoryId });
            unbxdCore.options.productType = productTypes.CATEGORY;
            unbxdCore.getResults();

        } else {

            //call onPageLoad
            typeof (onPageLoad) == "function" && onPageLoad(unbxdCore.getResponseObj());
        }

    }

    static getDerivedStateFromProps(props, state) {
        if (props.productType !== state.productType) {
            return { productType: props.productType };
        }
    }

    render() {
        return (
            <AppContextProvider value={this.getProps()}>
                {this.props.children}
            </AppContextProvider>
        )
    }
}

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
}

export default UnbxdSearchWrapper;
