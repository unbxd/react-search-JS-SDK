const searchConfiguration = {
    siteKey: '',
    apiKey: '',
    isFlag: true,
    sdkHostName: 'https://search.unbxd.io/',
    queryString: '/search?q=',
    searchQueryParam: 'q',
    productAttributes: ['title'],
    defaultFilters: null,
    spellCheck: false,
    pageSize: 10,
    startPageNo: 0,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    searchQueryParam: null,
    updateUrls: true,
    showVariants: false,
    variantConfig: {
        variantsCount: 1,
        variantAttributes: [],
        variantMapping: {},
        variantsGroupBy: ''
    },
    extraParams: '',
    facetMultilevel: true,
    facetDepth: 6,
    productId: 'uniqueId',
    swatches: true,
    swatchMap: {},
    callBackFn: () => { console.log("Loaded") }
}
export default searchConfiguration;