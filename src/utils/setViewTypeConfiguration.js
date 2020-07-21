function setViewTypeConfiguration(config) {
  const { viewType } = config;
  this.setState(currentState => {
    return {
      ...currentState,
      unbxdState: { ...currentState.unbxdState, viewType }
    };
  });
}

export default setViewTypeConfiguration;
