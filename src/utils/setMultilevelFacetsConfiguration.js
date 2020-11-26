function setMultilevelFacetsConfiguration(config) {
    const {
        categoryDisplayName,
        categoryField,
        facetDepth,
        facetLimit
    } = config;

    if (categoryDisplayName.length > 0) {
        this.state.unbxdCore.options.extraParams[
            'f.categoryPath.displayName'
        ] = categoryDisplayName;
    }

    if (categoryField.length > 0) {
        this.state.unbxdCore.options.extraParams[
            'facet.multilevel'
        ] = categoryField;
    }

    this.state.unbxdCore.options.extraParams[
        'f.categoryPath.max.depth'
    ] = facetDepth;
    this.state.unbxdCore.options.extraParams[
        'f.categoryPath.facet.limit'
    ] = facetLimit;
}

export default setMultilevelFacetsConfiguration;
