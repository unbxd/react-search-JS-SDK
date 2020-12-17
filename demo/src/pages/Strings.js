import React, { useEffect, useContext } from 'react';

import ProductsListing from '../components/ProductsListing';
import SpellChecker from '../components/SpellChecker';
import Paginator from '../components/Paginator';
import Sorter from '../components/Sorter';
import MerchandizingBanner from '../components/MerchandizingBanner';
import TextFilters from '../components/TextFilters';
import RangeFilters from '../components/RangeFilters';
import CombinedFilters from '../components/CombinedFilters';
import MultilevelFilters from '../components/MultilevelFilters';
import ActiveFilters from '../components/ActiveFilters';
import Crumbs from '../components/Crumbs';
import SearchDescription from '../components/SearchDescription';
import ProductViewTypes from '../components/ProductViewTypes';
import ProductsSize from '../components/ProductsSize';
import FacetApplyClear from '../components/FacetApplyClear';
import { ProductTypeContext } from '../context';

const Strings = () => {
    const [productType, setProductType] = useContext(ProductTypeContext);
    useEffect(() => {
        window.UnbxdAnalyticsConf = {};
        window.UnbxdAnalyticsConf['page'] = 'CATEGORY:strings';
        window.UnbxdAnalyticsConf['page_type'] = 'BOOLEAN';
        setProductType('CATEGORY');
    }, []);
    return (
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
                    {/* <CombinedFilters/> */}
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
    );
};

export default Strings;
