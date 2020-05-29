import React, { Component } from 'react';
import UnbxdSearch from 'unbxd-search-core';

import { AppContextProvider } from './common/context';
import searchConfigurations from './config';
import '../public/css/index.scss';

class App extends Component {

    setProductConfiguration = (config) => {
        const { per_page, requiredFields, variants,
            variantCount, variantRequiredFields, groupBy } = config;
        this.state.unbxdCore.setNumberOfProducts(per_page);
        this.state.unbxdCore.setFields(requiredFields);
        this.state.unbxdCore.setIsVariants(variants);
        this.state.unbxdCore.setVariantsCount(variantCount);
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
            helpers: this.helpers
        };

    }

    unbxdCallBack = (unbxdSearchObj, eventName) => {
        if (eventName === 'AFTER_API_CALL') {
            this.setState({ unbxdCore: unbxdSearchObj })
        }
    }

    componentDidMount() {
        //this.state.unbxdCore.getResults('boots');
        //this.state.unbxdCore.getResults('cooking stoves');
        this.state.unbxdCore.getResults('red shirt');
        //this.state.unbxdCore.getResults('xxxxxxxxxxxxxxx');
    }

    render() {
        return (
            <AppContextProvider value={this.state}>
                {this.props.children}
            </AppContextProvider>
        )
    }
}

export default App;
