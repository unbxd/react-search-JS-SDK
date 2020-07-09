import React from 'react';
import ReactDOM from 'react-dom';

import UnbxdSearchWrapper from '@unbxd-ui/react-search-sdk';
import ProductsListing from './components/ProductsListing';
import SpellChecker from './components/SpellChecker';
import SearchBar from './components/SearchBar';
import Paginator from './components/Paginator';
import Sorter from './components/Sorter';
import MerchandizingBanner from './components/MerchandizingBanner';
import Filters from './components/Filters';
import SearchDescription from './components/SearchDescription';
import '@unbxd-ui/react-search-sdk/public/dist/css/core.css';
import '../public/css/index.scss';


const App = () => {

    console.log("render ");
    return (<UnbxdSearchWrapper
        siteKey='wildearthclone-neto-com-au808941566310465'
        apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

        <SearchBar />



        <div className='UNX-search__container'>
            <div className='UNX-searchMeta__container'></div>
            <div className='UNX-searchResults__container'>
                <div className='UNX-searchFacet__container'>
                    <Filters />
                </div>

                <div className='UNX-searchResult__container'>
                    <MerchandizingBanner />
                    <SpellChecker />

                    <div className='UNX-searchHeader__container'>
                        <SearchDescription />
                        <Sorter />
                        <Paginator />
                    </div>

                    <ProductsListing />
                </div>

            </div>
        </div>

    </UnbxdSearchWrapper >)
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
