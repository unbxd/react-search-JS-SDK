import { productTypes } from '../config';

function setSearchBoxConfiguration(config) {
    const {
        unbxdCore,
        helpers: { getUpdatedResults }
    } = this.state;
    unbxdCore.options.productType = productTypes.SEARCH;
    getUpdatedResults(config);
}

export default setSearchBoxConfiguration;
