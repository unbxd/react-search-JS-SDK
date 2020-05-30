import React, { Component } from 'react';
import UnbxdSearch from 'unbxd-search-core';

import { AppContextProvider } from './common/context';
import searchConfigurations from './config';
import '../public/css/index.scss';

class App extends Component {

    setProductConfiguration = (config) => {
        const { pageSize, requiredFields, showVariants,
            variantsCount, variantRequiredFields, groupBy } = config;
        this.state.unbxdCore.setNumberOfProducts(pageSize);
        this.state.unbxdCore.setFields(requiredFields);
        this.state.unbxdCore.setIsVariants(showVariants);
        this.state.unbxdCore.setVariantsCount(variantsCount);
        this.state.unbxdCore.setVariantFields(variantRequiredFields);
        this.state.unbxdCore.setVariantsGroupBy(groupBy);
    }

    helpers = { setProductConfiguration: this.setProductConfiguration }

    constructor(props) {
        super(props)
        const { siteName, siteKey } = this.props;

        this.state = {
            unbxdCore:
                new UnbxdSearch({ ...searchConfigurations, siteName, siteKey, callBackFn: this.unbxdCallBack }),

        };

    }

    unbxdCallBack = (unbxdSearchObj, eventName) => {
        if (eventName === 'AFTER_API_CALL') {
            this.setState({ unbxdCore: unbxdSearchObj })
        }
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
