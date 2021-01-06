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

const getCategoryId = () => {
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
    const [productType, setProductType] = useContext(ProductTypeContext);
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

    const handleRouteChange = (hash) => {
        scrollTop();
        if (routeLocation.hash && routeHistory.action !== 'POP') {
            routeHistory.push(`${routeLocation.pathname}#${hash}`);
        } else {
            routeHistory.replace(`${routeLocation.pathname}#${hash}`);
        }
    };

    return (
        <UnbxdSearchWrapper
            siteKey="ss-unbxd-sanj-tennis7501607934430"
            apiKey="6fbadfac18b560a0926da3e06fefecfb"
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
