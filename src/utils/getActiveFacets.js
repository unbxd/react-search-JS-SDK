const getActiveFacets = unbxdSearchObj => {
  const textFacets = unbxdSearchObj.state.selectedFacets;
  const rangeFacets = unbxdSearchObj.state.rangeFacet;
  const textFacetsArr = Object.keys(textFacets);

  let activeFacetsObj = {};
  textFacetsArr.forEach(facet => {
    const valObj = textFacets[facet];
    let arr = [];
    valObj.forEach(val => {
      arr.push(val.name);
    });
    activeFacetsObj[facet] = arr;
  });

  activeFacetsObj = { ...activeFacetsObj, ...rangeFacets };

  const { categoryPath = [] } = unbxdSearchObj.state.categoryFilter;
  activeFacetsObj[unbxdSearchObj.state.categoryFilter] = categoryPath.length
    ? categoryPath.join('>')
    : '';

  return activeFacetsObj;
};

export default getActiveFacets;
