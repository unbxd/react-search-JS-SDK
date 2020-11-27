function setPageSizeConfiguration(config, triggerResults = false) {
    const { size } = config;
    const {
        unbxdCore,
        helpers: { getUpdatedResults }
    } = this.state;
    unbxdCore.setPageSize(size);

    if (triggerResults) {
        getUpdatedResults();
    } else {
        unbxdCore.setPageStart(0);
    }
}

export default setPageSizeConfiguration;
