const searchConfiguration = {
    siteName: '',
    siteKey: '',
    isFlag: true,
    sdkHostName: 'https://search.unbxd.io/',
    queryString: '/search?q=',
    searchQueryParam: 'q',
    fields: ['title'],
    defaultFilters: null,
    spellCheck: false,
    pageSize: 5,
    startPageNo: 0,
    facetMultiSelect: true,
    facetMultiSelectionMode: true,
    searchQueryParam: null,
    updateUrls: true,
    showVariants: false,
    variantConfig: {
        variantsCount: 1,
        variantAttributes: [],
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