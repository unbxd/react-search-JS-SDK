const searchConfigurations = {
    siteName: '',
    siteKey: '',
    searchEndPoint: 'https://search.unbxd.io/',
    searchQueryParam: 'q',
    browseQueryParam: 'p',
    productAttributes: ['title'],
    defaultFilters: null,
    spellCheck: {
        enabled: false
    },
    pageSize: 10,
    startPageNo: 0,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    updateUrls: true,
    extraParams: {
        version: 'V2'
    },
    facetMultilevel: true,
    facetDepth: 6,
    productIdAttribute: 'uniqueId',
    showSwatches: true,
    swatchMap: {},
    onEvent: () => {},
    getCategoryId: () => {},
    applyMultipleFilters: false,
    hashMode: true,
    enableUnbxdAnalytics: false
};

export default searchConfigurations;
