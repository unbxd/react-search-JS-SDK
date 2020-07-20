import { productTypes } from '../config';

function setSearchBoxConfiguration(config) {
  const { query = '*' } = config;
  const { unbxdCore } = this.state;
  unbxdCore.options.productType = productTypes.SEARCH;
  unbxdCore.getResults(query);
}

export default setSearchBoxConfiguration;
