function setMultilevelFacetsConfiguration(config) {
    const { facetDepth, facetLimit } = config;

    this.state.unbxdCore.options.extraParams[
        'f.categoryPath.max.depth'
    ] = facetDepth;
    this.state.unbxdCore.options.extraParams[
        'f.categoryPath.facet.limit'
    ] = facetLimit;
}

export default setMultilevelFacetsConfiguration;
