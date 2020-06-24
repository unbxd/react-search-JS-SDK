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
    extraParams: {
        "version": "V2",
        //"f.categoryPath.facet.version": "V2",
    },
    facetMultilevel: true,
    facetDepth: 6,
    productId: 'uniqueId',
    swatches: true,
    swatchMap: {},
    callBackFn: () => { console.log("Loaded") },
    ProductType:"SEARCH" //"CATEGORY"

}

export default searchConfigurations;
