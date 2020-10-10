//IE imports
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import UnbxdSearchWrapper from '@unbxd-ui/react-search-sdk';
import ProductsListing from './components/ProductsListing';
import SpellChecker from './components/SpellChecker';
import SearchBar from './components/SearchBar';
import Paginator from './components/Paginator';
import Sorter from './components/Sorter';
import MerchandizingBanner from './components/MerchandizingBanner';
import TextFilters from './components/TextFilters';
import CombinedFilters from './components/CombinedFilters';
import RangeFilters from './components/RangeFilters';
import MultilevelFilters from './components/MultilevelFilters';
import ActiveFilters from './components/ActiveFilters';
import Crumbs from './components/Crumbs';
import SearchDescription from './components/SearchDescription';
import ProductViewTypes from './components/ProductViewTypes';
import ProductsSize from './components/ProductsSize';
import FacetApplyClear from './components/FacetApplyClear';
import '@unbxd-ui/react-search-sdk/public/dist/css/theme.css';
import '@unbxd-ui/react-search-sdk/public/dist/css/core.css';
//import '@unbxd-ui/react-search-sdk/public/dist/css/ie.css';
import '../public/css/index.scss';

const categoryLinksInit = [
    { path: 'All Products>Shorts', id: 'shorts', label: 'Shorts' },
    { path: 'All Products>Shoes', id: 'shoes', label: 'Shoes' },
    { path: 'All Products>Jackets', id: 'jackets', label: 'Jackets' },
    { path: 'All Products>T-Shirts', id: 'shirts', label: 'Shirts ' },
];

const getCategoryId = () => {
    if (window.UnbxdAnalyticsConf) {
        return encodeURIComponent(window.UnbxdAnalyticsConf['page']);
    }
};

const searchConfigurations = {
    siteName: 'wildearthclone-neto-com-au808941566310465',
    siteKey: 'e6959ae0b643d51b565dc3e01bf41ec1',
    searchEndPoint: 'https://search.unbxd.io/',
    searchQueryParam: 'q',
    productAttributes: [
        'title',
        'uniqueId',
        'imageUrl',
        'RRP_Price',
        'unbxd_price',
        'productUrl',
    ],
    defaultFilters: null,
    spellCheck: {
        enabled: false,
    },
    pageSize: 10,
    startPageNo: 0,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    updateUrls: true,
    variants: {
        enabled: false,
        count: 1,
        attributes: [
            'v_title',
            'vId',
            'imageUrl',
            'v_RRP_Price',
            'v_unbxd_price',
            'productUrl',
        ],
        mapping: {},
        groupBy: '',
    },
    extraParams: {
        version: 'V2',
        'f.categoryPath.displayName': 'category',
        'facet.multilevel': 'categoryPath',
        'f.categoryPath.max.depth': '',
        'f.categoryPath.facet.limit': '',
        //"f.categoryPath.facet.version": "V2",
    },
    facetMultilevel: true,
    facetDepth: 6,
    productIdAttribute: 'uniqueId',
    showSwatches: false,
    swatchMap: {},
    onEvent: () => {},
    getCategoryId: () => {},
    applyMultipleFilters: false,
    hashMode: true,
};

const App = () => {
    const [categoryPathLinks, setCategoryPathLinks] = useState(
        categoryLinksInit
    );
    const [productType, setProductType] = useState('SEARCH');
    const [showFilters, setShowFilters] = useState(false);

    const handleClose = () => setShowFilters(false);
    const handleShow = () => setShowFilters(true);
    const handleCategoryLinkClick = (event) => {
        const path = event.target.dataset['unx_path'];
        const updatedPathLinks = categoryPathLinks.map((links) => {
            if (links.path === path) {
                return { ...links, isSelected: true };
            } else {
                return { ...links, isSelected: false };
            }
        });
        setCategoryPathLinks(updatedPathLinks);
        window.UnbxdAnalyticsConf = {};
        window.UnbxdAnalyticsConf['page'] = path;
        window.UnbxdAnalyticsConf['page_type'] = 'BOOLEAN';
        setProductType('CATEGORY');
    };

    return (
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            searchConfigurations={searchConfigurations}
            getCategoryId={getCategoryId}
            productType={productType}
        >
            <Modal
                className="UNX-filterModal UNX-mobileView"
                show={showFilters}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filter By</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Sorter />
                    <ProductsSize />
                    <FacetApplyClear />
                    <MultilevelFilters showLabel={false} />
                    <RangeFilters />
                    <TextFilters />
                    <FacetApplyClear />
                </Modal.Body>
            </Modal>
            <SearchBar onSearch={setProductType} productType={productType} />
            <div className="UNX-categoryLinks__container">
                <div className="UNX-categoryLink__Header">
                    {categoryPathLinks.map(
                        ({ path, id, label, isSelected }) => {
                            return (
                                <div
                                    className={`menu-items ${
                                        isSelected && productType === 'CATEGORY'
                                            ? 'active'
                                            : ''
                                    }`}
                                    data-unx_path={path}
                                    key={id}
                                    onClick={handleCategoryLinkClick}
                                >
                                    {label}
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
            <div className="UNX-mobileMenu UNX-mobileView">
                <Dropdown className="UNX-categoryLink__dropdown">
                    <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        size="md"
                    >
                        Menu
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {categoryPathLinks.map(
                            ({ path, id, label, isSelected }) => {
                                return (
                                    <Dropdown.Item
                                        className={`menu-items ${
                                            isSelected &&
                                            productType === 'CATEGORY'
                                                ? 'active'
                                                : ''
                                        }`}
                                        data-unx_path={path}
                                        key={id}
                                        onClick={handleCategoryLinkClick}
                                    >
                                        {' '}
                                        {label}
                                    </Dropdown.Item>
                                );
                            }
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <div className="UNX-fiterIcon" onClick={handleShow}>
                    <i className="fa fa-filter" aria-hidden="true"></i>
                </div>
            </div>
            <div className="UNX-search__container">
                <div className="UNX-searchMeta__container">
                    <Crumbs />
                    <div className="UNX-searchMeta__more">
                        <ActiveFilters />
                        <ProductViewTypes />
                    </div>
                </div>
                <div className="UNX-searchResults__container">
                    <div className="UNX-searchFacet__container">
                        <MultilevelFilters />
                        <FacetApplyClear />
                        <RangeFilters />
                        <TextFilters />
                        {/* <CombinedFilters /> */}
                        <FacetApplyClear />
                    </div>

                    <div className="UNX-searchResult__container">
                        <MerchandizingBanner />
                        <SearchDescription />
                        <SpellChecker />

                        <div className="UNX-searchHeader__container">
                            <Sorter />
                            <ProductsSize />
                            <Paginator />
                        </div>

                        <ProductsListing />

                        <Paginator />
                    </div>
                </div>
            </div>
        </UnbxdSearchWrapper>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
