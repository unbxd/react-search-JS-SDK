import { facetTypes } from '../../../config';

export const getFormattedMultilevelFacets = (bucketedFacets, unbxdCore) => {

    const getBreadCrumbsList = unbxdCore.getBreadCrumbsList.bind(unbxdCore);

    const multilevelFacets = [];
    let highestBreadcrumbLevel = 0;
    let facetName = '';
    bucketedFacets.map((bucketedFacet) => {
        const {
            displayName,
            level,
            filterField,
            values = [],
            position
        } = bucketedFacet;
        facetName = displayName;
        const breadCrumbsList = getBreadCrumbsList(filterField);
        highestBreadcrumbLevel = 0;

        const breadCrumbFacets = breadCrumbsList.map((breadcrumb) => {
            console.log('breadcrumb', breadcrumb);
            if (highestBreadcrumbLevel < breadcrumb.level) {
                highestBreadcrumbLevel = breadcrumb.level;
            }
            return {
                filterField: breadcrumb.filterField,
                level: breadcrumb.level,
                name: breadcrumb.value,
                isSelected: true
            };
        });

        let formattedBucketedFacets = [];
        if (
            highestBreadcrumbLevel === level &&
            highestBreadcrumbLevel > 0
        ) {
            const lastBreadcrumb =
                breadCrumbFacets[breadCrumbFacets.length - 1];
            const hit = values.find((facetValue) => {
                const { name } = facetValue;
                const { name: breadcrumbName } = lastBreadcrumb;
                return breadcrumbName === name;
            });
            formattedBucketedFacets = [
                {
                    ...hit,
                    filterField,
                    level,
                    isSelected: true
                }
            ];
            breadCrumbFacets.pop();
        } else {
            formattedBucketedFacets = values.map((facetValue) => {
                const { name, count, dataId } = facetValue;
                return {
                    filterField,
                    level,
                    name,
                    count,
                    dataId
                };
            });
        }

        const facet = {
            facetName,
            filterField,
            displayName,
            facetType: facetTypes.MULTILEVEL_FACET,
            position,
            values: [...breadCrumbFacets, ...formattedBucketedFacets]
        };
        multilevelFacets.push(facet);
    });

    return multilevelFacets
}

export const getFacetCoreMethods = (unbxdCore) => {
    const getBucketedFacets = unbxdCore.getBucketedFacets.bind(unbxdCore);
    const getBreadCrumbsList = unbxdCore.getBreadCrumbsList.bind(unbxdCore);
    const setCategoryFilter = unbxdCore.setCategoryFilter.bind(unbxdCore);
    const deleteCategoryFilter = unbxdCore.deleteCategoryFilter.bind(unbxdCore);
    const getResults = unbxdCore.getResults.bind(unbxdCore);

    return {
        getBucketedFacets,
        getBreadCrumbsList,
        setCategoryFilter,
        deleteCategoryFilter,
        getResults
    };
};
