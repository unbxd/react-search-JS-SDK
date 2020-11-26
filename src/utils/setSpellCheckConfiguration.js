function setSpellCheckConfiguration(config) {
    const { enable = false } = config;
    const { unbxdCore } = this.state;

    unbxdCore.setSpellCheck(enable);
}

export default setSpellCheckConfiguration;
