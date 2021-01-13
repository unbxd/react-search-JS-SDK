import { manageStateTypes } from '../config';

function resetSearch() {
    const {
        unbxdCore,
        helpers: { manageTextFacets, manageRangeFacets, setSortConfiguration }
    } = this.state;

    if (unbxdCore.state.responseObj !== null) {
        unbxdCore.state.selectedSort = '';
    }
    manageTextFacets(null, null, null, manageStateTypes.RESET);
    manageRangeFacets(null, null, null, manageStateTypes.RESET);
    setSortConfiguration({
        sortBy: ``
    });
    unbxdCore.state.selectedFacets = {};
    unbxdCore.state.rangeFacet = {};
    unbxdCore.setPageStart(0);
    unbxdCore.state.categoryFilter = {};
    unbxdCore.state.breadcrumbs = {};
}

export default resetSearch;
