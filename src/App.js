import React, { Component } from 'react';
import UnbxdSearchCore from 'unbxd-search-core';

import { AppContextProvider } from './common/context';
import searchConfigurations from './config';
import '../public/css/index.scss';

class App extends Component {

    state = {
        unbxdCore: null
    }

    unbxdCallBack = (unbxdSearchObj, eventName) => {
        if (eventName === 'afterApiCall') {

            this.setState({ unbxdCore: unbxdSearchObj })
        }
    }

    componentDidMount() {
        const { siteName, siteKey } = this.props;
        const searchObj = new UnbxdSearchCore({ ...searchConfigurations, siteName, siteKey }, this.unbxdCallBack);
        searchObj.getResults('shoes');
    }

    render() {

        const { unbxdCore } = this.state
        return (
            <AppContextProvider value={unbxdCore}>
                {this.props.children}
            </AppContextProvider>
        )
    }
}

export default App;
