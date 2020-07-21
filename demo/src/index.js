import React from 'react';
import ReactDOM from 'react-dom';

import UnbxdSearchWrapper from '@unbxd-ui/react-search-sdk';
import ProductsListing from './components/ProductsListing';
import SpellChecker from './components/SpellChecker';
import SearchBar from './components/SearchBar';
import Paginator from './components/Paginator';
import Sorter from './components/Sorter';
import MerchandizingBanner from './components/MerchandizingBanner';
import TextFilters from './components/TextFilters';
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


const App = () => {

    console.log("render ");
    return (<UnbxdSearchWrapper
         siteKey='wildearthclone-neto-com-au808941566310465'
        apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>
        {/*siteKey="prod-rugsusa808581564092094"
        apiKey="ea4823934059ff8ad5def0be04f8dd4e"> */}

        <SearchBar />

        <div className='UNX-search__container'>
            <div className='UNX-searchMeta__container'>
            <Crumbs/>
            <div className='UNX-searchMeta__more'>
                <ActiveFilters/>
                <ProductViewTypes/>
            </div>
            
            </div>
            <div className='UNX-searchResults__container'>
                <div className='UNX-searchFacet__container'>
                    <MultilevelFilters/>
                    <RangeFilters/>
                    <TextFilters />
                </div>

                <div className='UNX-searchResult__container'>
                    <MerchandizingBanner />
                    <SearchDescription />
                    <SpellChecker />

                    <div className='UNX-searchHeader__container'>
                        
                        <Sorter />
                        <ProductsSize/>
                        <Paginator />
                    </div>

                    <ProductsListing />

                    <Paginator />
                </div>

            </div>
        </div>

    </UnbxdSearchWrapper >)
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
