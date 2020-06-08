import React, { Component } from 'react';
import UnbxdSearch from '@unbxd-ui/unbxd-search-core';

import { AppContextProvider } from './common/context';
import searchConfigurations from './config';
import { paginationTypes } from '../src/modules/products/utils';
import '../public/css/index.scss';

class App extends Component {

    setProductConfiguration = (config) => {
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

    trackActions = ({ type = 'unbxdAction', data = {} }) => {

        this.unbxdCallBack(null, type, data);
    }

    helpers = {
        setProductConfiguration: this.setProductConfiguration,
        trackActions: this.trackActions
    }

    constructor(props) {
        super(props)
        const { siteKey, apiKey } = this.props;

        this.state = {
            unbxdCore:
                new UnbxdSearch({ ...searchConfigurations, siteKey, apiKey, callBackFn: this.unbxdCallBack }),

        };

    }

    unbxdCallBack = (unbxdSearchObj, eventName, data) => {
        if (eventName === 'AFTER_API_CALL') {
            this.setState({ unbxdCore: unbxdSearchObj })
        }

        console.log("unbxdCallBack ", eventName, data)
    }

    getProps = () => {
        return { ...this.state, helpers: this.helpers }
    }

    componentDidMount() {
        //this.state.unbxdCore.getResults('boots');
        this.state.unbxdCore.getResults('cooking stoves');
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

export default App;
