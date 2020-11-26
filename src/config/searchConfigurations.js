const searchConfigurations = {
    siteName: '',
    siteKey: '',
    searchEndPoint: 'https://search.unbxd.io/',
    searchQueryParam: 'q',
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
    variants: {
        enabled: false,
        count: 1,
        attributes: [],
        mapping: {},
        groupBy: ''
    },
    extraParams: {
        version: 'V2'
        //"f.categoryPath.facet.version": "V2",
    },
    facetMultilevel: true,
    facetDepth: 6,
    productIdAttribute: 'uniqueId',
    showSwatches: true,
    swatchMap: {},
    onEvent: () => {},
    getCategoryId: () => {},
    applyMultipleFilters: false,
    hashMode: true
};

export default searchConfigurations;
