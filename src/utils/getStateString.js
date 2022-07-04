const getStateString = function () {
    const { productType } = this.options;
    /** Update reference to new weburl state */
    const q = this.state.currentWebUrl.split(
        `${productType.toLocaleLowerCase()}?`
    )[1];
    this.state.urlState = q;
    return q;
};

export default getStateString;
