function setPageSizeConfiguration(config, triggerResults = false) {
    const { size } = config;
    const { unbxdCore } = this.state;
    unbxdCore.setPageSize(size);
    this.setState((existingState) => {
        return {
            ...existingState,
            unbxdState: { ...existingState.unbxdState, pageSize: size }
        };
    });

    if (triggerResults) {
        unbxdCore.setPageStart(0);
        unbxdCore.getResults();
    } else {
        unbxdCore.setPageStart(0);
    }
}

export default setPageSizeConfiguration;
