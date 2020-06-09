import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnbxdSearch from '@unbxd-ui/unbxd-search-core/src/index';

import { AppContextProvider } from './common/context';
import { searchConfigurations } from './config';
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

    constructor(props) {
        super(props);

        const { siteKey, apiKey } = this.props;

        this.unbxdCallBack = this.unbxdCallBack.bind(this);
        this.setProductConfiguration = this.setProductConfiguration.bind(this);
        this.trackActions = this.trackActions.bind(this);
        
        this.state = {
            unbxdCore:
                new UnbxdSearch({ ...searchConfigurations, siteKey, apiKey, callBackFn: this.unbxdCallBack }),

        };

    }

    trackActions({ type = 'unbxdAction', data = {} }) {

        this.unbxdCallBack(null, type, data);
    }


    unbxdCallBack(unbxdSearchObj, eventName, data) {
        if (eventName === 'AFTER_API_CALL') {
            this.setState({ unbxdCore: unbxdSearchObj })
        }

        console.log("unbxdCallBack ", eventName, data);
    }


    getProps() {
        const helpers = {
            setProductConfiguration: this.setProductConfiguration,
            trackActions: this.trackActions,
        }

        return {
            ...this.state, helpers
        }
    }

    componentDidMount() {
        this.state.unbxdCore.getResults('boots');
        //this.state.unbxdCore.getResults('cooking stoves');
        //this.state.unbxdCore.getResults('red shirt');
        //this.state.unbxdCore.getResults('xxxxxxxxxxxxxxx');
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
}

export default UnbxdSearchWrapper;
