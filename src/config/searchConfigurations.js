const searchConfigurations = {
    siteName: '',
    siteKey: '',
    isFlag: true,
    sdkHostName: 'https://search.unbxd.io/',
    searchQueryParam: 'q',
    fields: ['title'],
    defaultFilters: null,
    spellCheck: {
        enabled: false
    },
    pageSize: 10,
    startPageNo: 0,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    updateUrls: true,
    showVariants: false,
    variants: {
        enabled: false,
        count: 1,
        attributes: [],
        mapping: {},
        groupBy: ''
    },
    extraParams: {
        "version": "V2",
        //"f.categoryPath.facet.version": "V2",
    },
    facetMultilevel: true,
    facetDepth: 6,
    productIdAttribute: 'uniqueId',
    swatches: true,
    swatchMap: {},
    callBackFn: () => { },
    getCategoryId: () => { },
    applyMultipleFilters: false,
    hashMode: true
}

export default searchConfigurations;
