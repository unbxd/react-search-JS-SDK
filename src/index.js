import React, { Component } from 'react';
import UnbxdSearch from 'unbxdsdk';

import { AppContextProvider } from './AppContext';
import searchConfigurations from './config';

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
        const searchObj = new UnbxdSearch({ ...searchConfigurations, siteName, siteKey }, this.unbxdCallBack);
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
