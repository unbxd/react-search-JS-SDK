import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UnbxdSearchWrapper from '@unbxd-ui/react-search-sdk';

import { Strings, Accessories, Grips, Balls, Home } from './pages';

import { searchConfigurations, categoryLinks } from './config';
import { ProductTypeContext } from './context';
import MobileModal from './components/MobileModal';
import CategoryLinks from './components/CategoryLinks';
import MobileMenu from './components/MobileMenu';
import SearchBar from './components/SearchBar';

import '@unbxd-ui/react-search-sdk/public/dist/css/theme.css';
import '@unbxd-ui/react-search-sdk/public/dist/css/core.css';
// import '@unbxd-ui/react-search-sdk/public/dist/css/ie.css';
import '../public/css/index.scss';

const getCategoryId = () => {
    if (window.UnbxdAnalyticsConf) {
        const field = window.UnbxdAnalyticsConf['field'];
        const page = encodeURIComponent(window.UnbxdAnalyticsConf['page']);
        return `${field}:${page}`;
    }
};

const setCategoryId = (param, self) => {
    const { level, name, parent } = param;
    let page = '';
    const pathArr = [];
    const l = Number(level);
    if (l === 1) {
        return;
    }
    const breadCrumbs = self.getBreadCrumbsList(parent);
    breadCrumbs.forEach((element, i) => {
        const { value, level } = element;

        if (l > level) {
            pathArr.push(value);
        }
    });
    if (l > breadCrumbs.length) {
        pathArr.push(name);
    }
    page = pathArr.join('>');
    if (window.UnbxdAnalyticsConf) {
        window.UnbxdAnalyticsConf.page = page;
    }
    return true;
};

const Loader = () => {
    return (
        <div className="overlay">
            <div className="overlay__inner">
                <div className="overlay__content">
                    <span className="spinner" />
                </div>
            </div>
        </div>
    );
};

const ErrorComponent = () => {
    return <div>Something went wrong.</div>;
};

const AppRoutes = () => {
    const [categoryPathLinks, setCategoryPathLinks] = useState(categoryLinks);
    const [productType, setProductType] = useState('SEARCH');
    const [refreshId, setRefreshId] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const handleClose = () => setShowFilters(false);
    const handleShow = () => setShowFilters(true);
    const handleCategoryLinkClick = (event) => {
        const path = event.target.dataset['unx_path'];
        let currentCategoryItem = null;
        const updatedPathLinks = categoryPathLinks.map((links) => {
            if (links.path === path) {
                currentCategoryItem = links;
                return { ...links, isSelected: true };
            }
            return { ...links, isSelected: false };
        });
        setCategoryPathLinks(updatedPathLinks);
        window.UnbxdAnalyticsConf = {};
        window.UnbxdAnalyticsConf['field'] = currentCategoryItem.field;
        window.UnbxdAnalyticsConf['page'] = currentCategoryItem.path;
        window.UnbxdAnalyticsConf['page_type'] = 'BOOLEAN';
        setProductType('CATEGORY');
        setRefreshId(refreshId + 1);
    };

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    return (
        <div>
            <Router>
                <ProductTypeContext.Provider
                    value={[productType, setProductType]}
                >
                    <UnbxdSearchWrapper
                        siteKey="ss-unbxd-sanj-tennis7501607934430"
                        apiKey="6fbadfac18b560a0926da3e06fefecfb"
                        getCategoryId={getCategoryId}
                        setCategoryId={setCategoryId}
                        searchConfigurations={searchConfigurations}
                        productType={productType}
                        refreshId={refreshId}
                        loaderComponent={<Loader />}
                        errorComponent={<ErrorComponent />}
                    >
                        <MobileModal
                            showFilters={showFilters}
                            handleClose={handleClose}
                        />
                        <SearchBar
                            onSearch={setProductType}
                            productType={productType}
                        />

                        <CategoryLinks
                            categoryPathLinks={categoryPathLinks}
                            handleCategoryLinkClick={handleCategoryLinkClick}
                            setProductType={setProductType}
                        />
                        <MobileMenu
                            categoryPathLinks={categoryPathLinks}
                            handleCategoryLinkClick={handleCategoryLinkClick}
                            handleShow={handleShow}
                        />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/strings">
                                <Strings />
                            </Route>
                            <Route exact path="/accessories">
                                <Accessories />
                            </Route>
                            <Route exact path="/grips">
                                <Grips />
                            </Route>
                            <Route path="/balls">
                                <Balls />
                            </Route>
                        </Switch>
                    </UnbxdSearchWrapper>
                </ProductTypeContext.Provider>
            </Router>
        </div>
    );
};

export default AppRoutes;
