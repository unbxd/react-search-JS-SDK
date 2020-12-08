function setRangeFacetsConfiguration(config) {
    const { applyMultiple } = config;

    this.setState((existingState) => {
        return {
            ...existingState,
            unbxdState: { ...existingState.unbxdState, applyMultiple }
        };
    });
}

export default setRangeFacetsConfiguration;
