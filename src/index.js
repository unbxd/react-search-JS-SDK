// sdk exports
import Banners from './modules/banners';
import Breadcrumbs from './modules/breadcrumbs';
import FacetActions from './modules/facetActions';
import MultilevelFacets from './modules/multilevelFacets';
import PageSize from './modules/pageSize';
import Pagination from './modules/pagination';
import Products from './modules/products';
import RangeFacets from './modules/rangeFacets';
import SearchBox from './modules/searchBox';
import SearchTitle from './modules/searchTitle';
import SelectedFacets from './modules/selectedFacets';
import Sort from './modules/sort';
import SpellCheck from './modules/spellCheck';
import TextFacets from './modules/textFacets';
import CombinedFacets from './modules/combinedFacets';
import ViewTypes from './modules/viewTypes';
import UnbxdSearchWrapper from './UnbxdSearchWrapper';


//param added for the production debug
if(window.localStorage && window.localStorage.getItem("debug")) {
    console.log(UnbxdSearchWrapper)
}

export default UnbxdSearchWrapper;
export {
    Banners,
    Breadcrumbs,
    FacetActions,
    MultilevelFacets,
    PageSize,
    Pagination,
    Products,
    RangeFacets,
    SearchBox,
    SearchTitle,
    SelectedFacets,
    Sort,
    SpellCheck,
    TextFacets,
    CombinedFacets,
    ViewTypes,
    UnbxdSearchWrapper
};
