const getStateString = function () {
    const { productType } = this.options;
    const q = this.state.currentUrl.split(
        `${productType.toLocaleLowerCase()}?`
    )[1];
    this.state.urlState = q;
    return q;
};

export default getStateString;
