const searchConfigurations = {
    siteName: '',
    siteKey: '',
    isFlag: true,
    sdkHostName: 'https://search.unbxd.io/',
    queryString: '/search?q=',
    searchQueryParam: 'q',
    fields: ['title'],
    defaultFilters: null,
    spellCheck: false,
    pageSize: 10,
    startPageNo: 0,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    updateUrls: true,
    showVariants: false,
    variantConfig: {
        variantsCount: 1,
        variantAttributes: [],
        variantsGroupBy: '',
        variantMapping: {}
    },
    extraParams: '',
    facetMultilevel: true,
    facetDepth: 6,
    productId: 'uniqueId',
    swatches: true,
    swatchMap: {},
    callBackFn: () => { console.log("Loaded") }
}

export default searchConfigurations;
