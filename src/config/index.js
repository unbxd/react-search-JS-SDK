const searchConfiguration = {
    siteName: '',
    siteKey: '',
    isFlag: true,
    sdkHostName: 'https://search.unbxd.io/',
    queryString: '/search?q=',
    searchQueryParam: 'q',
    fields: [],
    defaultFilters: null,
    spellCheck: false,
    noOfProducts: 5,
    startPageNo: 0,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    searchQueryParam: null,
    updateUrls: true,
    showVariants: false,
    variantMapping: {},
    variantConfig: {
        count: 1
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