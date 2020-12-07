function setViewTypeConfiguration(config, triggerResults = false) {
    const { viewType } = config;
    this.setState((currentState) => {
        return {
            ...currentState,
            unbxdState: { ...currentState.unbxdState, viewType }
        };
    });
    if (triggerResults) {
        this.state.unbxdCore.options.extraParams['viewType'] = viewType;
        this.state.unbxdCore.getResults();
    }
}

export default setViewTypeConfiguration;
