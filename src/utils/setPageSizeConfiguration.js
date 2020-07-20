function setPageSizeConfiguration(config, triggerResults = false) {
  const { size } = config;

  this.state.unbxdCore.setPageSize(size);
  this.state.unbxdCore.setPageStart(0);

  if (triggerResults) {
    this.state.unbxdCore.getResults();
  }
}

export default setPageSizeConfiguration;
