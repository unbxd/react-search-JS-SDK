function resetSearch() {
    const { unbxdCore } = this.state;
    if (unbxdCore.state.responseObj !== null) {
        unbxdCore.state.selectedSort = '';
    }
    unbxdCore.state.selectedFacets = {};
    unbxdCore.state.rangeFacet = {};
    unbxdCore.state.categoryFilter = {};
    unbxdCore.state.breadcrumbs = {};
}

export default resetSearch;
