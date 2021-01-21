function setViewTypeConfiguration(config, triggerResults = false) {
    const { viewType } = config;
    this.setState((currentState) => {
        return {
            ...currentState,
            unbxdState: { ...currentState.unbxdState, viewType }
        };
    });
    const { unbxdCore } = this.state;
    unbxdCore.options.extraParams['viewType'] = viewType;
    if (triggerResults) {
        unbxdCore.options.extraParams['viewType'] = viewType;
        unbxdCore.getResults();
    }
}

export default setViewTypeConfiguration;
