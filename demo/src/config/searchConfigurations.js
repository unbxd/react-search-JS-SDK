const searchConfigurations = {
    siteName: 'wildearthclone-neto-com-au808941566310465',
    siteKey: 'e6959ae0b643d51b565dc3e01bf41ec1',
    searchEndPoint: 'https://search.unbxd.io/',
    searchQueryParam: 'q',
    browseQueryParam: 'p',
    productAttributes: [
        'title',
        'uniqueId',
        'imageUrl',
        'RRP_Price',
        'unbxd_price',
        'productUrl'
    ],
    defaultFilters: null,
    spellCheck: {
        enabled: false
    },
    pageSize: 10,
    startPageNo: 0,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    updateUrls: false,
    extraParams: {
        version: 'V2'
    },
    facetMultilevel: true,
    facetDepth: 6,
    productIdAttribute: 'uniqueId',
    showSwatches: false,
    swatchMap: {},
    onEvent: () => {},
    getCategoryId: () => {},
    applyMultipleFilters: false,
    hashMode: true,
    enableUnbxdAnalytics: true
};

export default searchConfigurations;
