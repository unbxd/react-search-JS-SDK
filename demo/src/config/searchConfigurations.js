const searchConfigurations = {
    siteName: 'wildearthclone-neto-com-au808941566310465',
    siteKey: 'e6959ae0b643d51b565dc3e01bf41ec1',
    searchEndPoint: 'https://console-nam.unbxd.io/ss/searchPreview/',
    searchQueryParam: 'q',
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
    updateUrls: true,
    variants: {
        enabled: false,
        count: 1,
        attributes: [
            'v_title',
            'vId',
            'imageUrl',
            'v_RRP_Price',
            'v_unbxd_price',
            'productUrl'
        ],
        mapping: {},
        groupBy: ''
    },
    extraParams: {
        version: 'V2',
        // 'f.categoryPath.displayName': 'category',
        // 'facet.multilevel': 'categoryPath',
        'f.categoryPath.max.depth': '',
        'f.categoryPath.facet.limit': ''
        //"f.categoryPath.facet.version": "V2",
        //'category-filter': 'All Products',
    },
    facetMultilevel: true,
    facetDepth: 6,
    productIdAttribute: 'uniqueId',
    showSwatches: false,
    swatchMap: {},
    onEvent: () => {},
    getCategoryId: () => {},
    setCategoryId: (param, self) => {
        const { level, name } = param;
        let page = ``;
        let pathArr = [];
        const l = Number(level);
        const breadCrumbs = self.getBreadCrumbsList();
        breadCrumbs.forEach((element, i) => {
            const { value, level } = element;

            if (l > level) {
                pathArr.push(value);
            }
        });
        if (l > breadCrumbs.length) {
            pathArr.push(name);
        }
        page = pathArr.join('>');
        if (window.UnbxdAnalyticsConf) {
            window.UnbxdAnalyticsConf.page = page;
        }
    },
    applyMultipleFilters: false,
    hashMode: true
};

export default searchConfigurations;
