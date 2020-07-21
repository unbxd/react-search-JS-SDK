function setTextFacetsConfiguration(config) {
  const { defaultFilters } = config;

  this.state.unbxdCore.options.defaultFilters = defaultFilters;
  this.setState((currentState=>{
    return {
      ...currentState,
      unbxdState: {
        ...currentState.unbxdState,
        selectedFacets: { ...defaultFilters }
      }
    }
  }));
}

export default setTextFacetsConfiguration;
