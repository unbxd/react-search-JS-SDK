const getStateString = function () {
    const { productType } = this.options;
    /** Update reference to new weburl state */
    const q = this.state.currentWebUrl.split(
        `${productType.toLocaleLowerCase()}?`
    )[1];
    this.state.urlState = q;

    const unbxdKeys = ["filter", "category-filter", "rows", "start", "sort", this.options.browseQueryParam, this.options.searchQueryParam];

    let urlSearchParam = new URLSearchParams(location.search);
    let currentSearchParams = new URLSearchParams(q);
    let urlObj = {};
    /** Add customer keys */
    for (const [key, value] of urlSearchParam) {
        if(unbxdKeys.indexOf(key) < 0) {
            /** It is a customer key */
            urlObj[key] = urlSearchParam.getAll(key);
        }
    }
    /** Add react state keys */
    for (const [key, value] of currentSearchParams) {
        urlObj[key] = currentSearchParams.getAll(key);
    }

    let urlStr = this.getUrlParamString("", urlObj);
    return urlStr;
};

export default getStateString;
