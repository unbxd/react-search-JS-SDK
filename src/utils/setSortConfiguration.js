function setSortConfiguration(config, triggerResults = false) {
    const { sortBy } = config;
    this.setState((existingState) => {
        return {
            ...existingState,
            unbxdState: { ...existingState.unbxdState, sort: sortBy }
        };
    });

    if (triggerResults) {
        this.state.unbxdCore.applySort(sortBy);
    } else {
        this.state.unbxdCore.setSort(sortBy);
    }
}

export default setSortConfiguration;
