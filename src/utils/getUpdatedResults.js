function getUpdatedResults(config = {}) {
    const { query } = config;
    const { unbxdCore } = this.state;
    unbxdCore.setPageStart(0);
    unbxdCore.getResults(query);
}

export default getUpdatedResults;
