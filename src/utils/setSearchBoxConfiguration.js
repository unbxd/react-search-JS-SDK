import { productTypes } from '../config';

function setSearchBoxConfiguration(config) {
    const {
        unbxdCore,
        helpers: { getUpdatedResults }
    } = this.state;
    unbxdCore.options.productType = productTypes.SEARCH;
    getUpdatedResults(config);
    this.setState((existingState) => {
        return {
            ...existingState,
            productType: productTypes.SEARCH,
            categoryId: ''
        };
    });
}

export default setSearchBoxConfiguration;
