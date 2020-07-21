function setMultilevelFacetsConfiguration(config) {
  const {
    categoryDisplayName,
    categoryField,
    defaultCategoryFilter,
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

  if (defaultCategoryFilter.length > 0) {
    this.state.unbxdCore.setDefaultCategoryFilter(defaultCategoryFilter);
  }

  this.state.unbxdCore.options.extraParams[
    'f.categoryPath.max.depth'
  ] = facetDepth;
  this.state.unbxdCore.options.extraParams[
    'f.categoryPath.facet.limit'
  ] = facetLimit;
}

export default setMultilevelFacetsConfiguration;
