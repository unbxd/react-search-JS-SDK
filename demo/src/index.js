import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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
import '@unbxd-ui/react-search-sdk/public/dist/css/core.css';
import '@unbxd-ui/react-search-sdk/public/dist/css/theme.css';

import '../public/css/index.scss';

const categoryLinksInit = [
  { path: 'All Products>Shorts', id: 'shorts', label: 'Shorts' },
  { path: 'All Products>Shoes', id: 'shoes', label: 'Shoes' },
  { path: 'All Products>Jackets', id: 'jackets', label: 'Jackets' },
  { path: 'All Products>T-Shirts', id: 'shirts', label: 'Shirts ' }
];

const getCategoryId = () => {
  if (window.UnbxdAnalyticsConf) {
    return encodeURIComponent(window.UnbxdAnalyticsConf['page']);
  }
};

const App = () => {
  const [categoryPathLinks, setCategoryPathLinks] = useState(categoryLinksInit);
  const [productType, setProductType] = useState('SEARCH');
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
    window.UnbxdAnalyticsConf['page_type'] = "BOOLEAN";
    setProductType('CATEGORY');
  };

  return (
    <UnbxdSearchWrapper
      siteKey="wildearthclone-neto-com-au808941566310465"
      apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
      getCategoryId={getCategoryId}
      productType={productType}
    >
      {/* siteKey="wildearthclone-neto-com-au808941566310465"
      apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
      getCategoryId={getCategoryId}
      productType={productType} */}
      {/*siteKey="prod-rugsusa808581564092094"
        apiKey="ea4823934059ff8ad5def0be04f8dd4e"> */}

      <SearchBar onSearch={setProductType} productType={productType} />
      <div className="UNX-categoryLinks__container">
        <div className="topnav">
          {categoryPathLinks.map(({ path, id, label, isSelected }) => {
            return (
              <div
                className={`${
                  isSelected && productType === 'CATEGORY' ? 'active' : ''
                }`}
                data-unx_path={path}
                key={id}
                onClick={handleCategoryLinkClick}
              >
                {label}
              </div>
            );
          })}
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
            {/* <RangeFilters />
            <TextFilters />  */}
             <CombinedFilters /> 
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
