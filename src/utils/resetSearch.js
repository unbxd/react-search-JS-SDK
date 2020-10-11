function resetSearch() {
    const { unbxdCore } = this.state;
    if (unbxdCore.state.responseObj !== null) {
        unbxdCore.state.selectedSort = '';
    }
    unbxdCore.state.selectedFacets = {};
    unbxdCore.state.rangeFacet = {};
    unbxdCore.state.categoryFilter = {};
    unbxdCore.state.breadcrumbs = {};
    //unbxdCore.state.didYouMean = null;
    //unbxdCore.state.startPageNo = 0;
    //unbxdCore.state.selectedSort = '';
    //unbxdCore.state.responseObj = null;
}

export default resetSearch;
