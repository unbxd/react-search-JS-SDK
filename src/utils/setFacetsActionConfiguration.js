function setFacetsActionConfiguration(config) {
    const { enable = false } = config;
    this.state.unbxdCore.options.applyMultipleFilters = enable;
}

export default setFacetsActionConfiguration;
