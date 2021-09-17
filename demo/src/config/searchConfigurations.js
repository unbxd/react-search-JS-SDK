const searchConfigurations = {
    searchEndPoint: 'https://search.unbxd.io/',
    searchQueryParam: 'q',
    browseQueryParam: 'p',
    defaultFilters: { flag: 'Product' },
    pageSize: 10,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    updateUrls: false,
    extraParams: {
        version: 'V2'
    },
    facetMultilevel: true,
    facetDepth: 6,
    applyMultipleFilters: false,
    hashMode: true,
    enableUnbxdAnalytics: true
};

export default searchConfigurations;
