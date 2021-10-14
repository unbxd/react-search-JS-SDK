//default config for the unbxdWrapper class
const searchConfigurations = {
    searchEndPoint: 'https://search.unbxd.io/',
    searchQueryParam: 'q',
    browseQueryParam: 'p',
    defaultFilters: {},
    pageSize: 10,
    facetMultiSelect: true,
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
