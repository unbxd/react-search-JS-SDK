function setSortConfiguration(config, triggerResults = false) {
  const { sortBy } = config;

  if (triggerResults) {
    this.state.unbxdCore.applySort(sortBy);
  } else {
    this.state.unbxdCore.setSort(sortBy);
  }
}

export default setSortConfiguration;
