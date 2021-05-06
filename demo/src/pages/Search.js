import React, { useState, useContext } from 'react';
import UnbxdSearchWrapper from '@unbxd-ui/react-search-sdk';
import { Strings, Accessories, Grips, Balls, Home } from '.';
import { searchConfigurations, categoryLinks } from '../config';
import { ProductTypeContext } from '../context';
import MobileModal from '../components/MobileModal';
import CategoryLinks from '../components/CategoryLinks';
import MobileMenu from '../components/MobileMenu';
import SearchBar from '../components/SearchBar';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { scrollTop } from '../utils';

export const getCategoryId = () => {
    if (window.UnbxdAnalyticsConf && window.UnbxdAnalyticsConf['page']) {
        return encodeURIComponent(window.UnbxdAnalyticsConf['page']);
    }
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

const Search = () => {
    const {
        productType,
        setProductType,
        enableFilters,
        setEnableFilters
    } = useContext(ProductTypeContext);
    const [categoryPathLinks, setCategoryPathLinks] = useState(categoryLinks);
    const [refreshId, setRefreshId] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [] = useState('');
    const routeHistory = useHistory();
    const routeLocation = useLocation();

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
        window.UnbxdAnalyticsConf['page'] = currentCategoryItem.path;
        window.UnbxdAnalyticsConf['page_type'] = 'BOOLEAN';
        setProductType('CATEGORY');
        setRefreshId(refreshId + 1);
    };

    const handleRouteChange = (searchObj, hash, refreshId) => {
        scrollTop();
        setEnableFilters(true);
        const { state = {} } = searchObj;
        const { responseObj = {} } = state;
        const { redirect = {} } = responseObj;
        const { type = '', value } = redirect;
        const urlParams = searchObj.getQueryParams();
        // check if it is the home page and we don't have any query params on the url.
        // return false to ensure sdk makes no further search calls
        if (
            routeLocation.pathname === '/' &&
            Object.keys(urlParams).length === 0 &&
            refreshId
        ) {
            return false;
        } else if (
            // check for redirects
            type === 'url' &&
            typeof value === 'string' &&
            value.length > 0
        ) {
            // if hash already exists, to retain the current state, push on history
            if (routeLocation.pathname === '/' && routeLocation.hash) {
                routeHistory.push(value);
            } else {
                routeHistory.replace(value);
            }
            return true;
        } else {
            // if hash already exists, to retain the current state, push on history
            if (routeLocation.hash && routeHistory.action !== 'POP') {
                routeHistory.push(`${routeLocation.pathname}#${hash}`);
            } else {
                routeHistory.replace(`${routeLocation.pathname}#${hash}`);
            }
            return true;
        }
    };

    return (
        <UnbxdSearchWrapper
            siteKey="ss-unbxd-ner-demo-site7501612449283"
            apiKey="955731f5d1c36ebbc704687b9bfd9b09"
            getCategoryId={getCategoryId}
            searchConfigurations={searchConfigurations}
            productType={productType}
            refreshId={refreshId}
            loaderComponent={<Loader />}
            errorComponent={<ErrorComponent />}
            onRouteChange={handleRouteChange}
        >
            <MobileModal showFilters={showFilters} handleClose={handleClose} />
            <SearchBar onSearch={setProductType} productType={productType} />

            <CategoryLinks
                categoryPathLinks={categoryPathLinks}
                handleCategoryLinkClick={handleCategoryLinkClick}
                setProductType={setProductType}
            />
            <MobileMenu
                categoryPathLinks={categoryPathLinks}
                handleCategoryLinkClick={handleCategoryLinkClick}
                handleShow={handleShow}
                enableFilters={enableFilters}
            />

            <Route exact path="/">
                <Home setRefreshId={setRefreshId} />
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
        </UnbxdSearchWrapper>
    );
};

export default Search;
