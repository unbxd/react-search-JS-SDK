import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Search from './pages/Search';
import Landing from './pages/Landing';
import { ProductTypeContext } from './context';

import '@unbxd-ui/react-search-sdk/public/dist/css/core.css';
import '@unbxd-ui/react-search-sdk/public/dist/css/theme.css';
// import '@unbxd-ui/react-search-sdk/public/dist/css/ie.css';
import '../public/css/index.scss';

const AppRoutes = () => {
    const [productType, setProductType] = useState('SEARCH');
    const [enableFilters, setEnableFilters] = useState(true);

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    return (
        <div>
            <Router>
                <ProductTypeContext.Provider
                    value={{
                        productType,
                        setProductType,
                        enableFilters,
                        setEnableFilters
                    }}
                >
                    <Switch>
                        <Route path="/">
                            <Search />
                        </Route>
                        <Route exact path="/landing">
                            <Landing />
                        </Route>
                    </Switch>
                </ProductTypeContext.Provider>
            </Router>
        </div>
    );
};

export default AppRoutes;
