import { facetTypes } from '../../../config';

export const getFormattedMultilevelFacets = (bucketedFacets, unbxdCore) => {
    const getBreadCrumbsList = unbxdCore.getBreadCrumbsList.bind(unbxdCore);
    const multilevelFacets = [];
    let highestBreadcrumbLevel = 0;
    let facetName = '';
    bucketedFacets.map((bucketedFacet) => {
        if(!bucketedFacet.filterField && bucketedFacet.multiLevelField) {
            bucketedFacet.filterField = bucketedFacet.multiLevelField
        }
        const {
            displayName,
            level,
            values = [],
            position,
            filterField
        } = bucketedFacet;
        facetName = displayName;
        const breadCrumbsList = getBreadCrumbsList(filterField);
        highestBreadcrumbLevel = 0;

        const breadCrumbFacets = breadCrumbsList.map((breadcrumb) => {
            if (highestBreadcrumbLevel < breadcrumb.level) {
                highestBreadcrumbLevel = breadcrumb.level;
            }
            return {
                filterField: breadcrumb.filterField,
                level: breadcrumb.level,
                name: breadcrumb.value,
                isSelected: true,
                dataId: breadcrumb.value
            };
        });

        let formattedBucketedFacets = [];
        if (highestBreadcrumbLevel === level && highestBreadcrumbLevel > 0) {
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
            values: [...breadCrumbFacets, ...formattedBucketedFacets],
            highestBreadcrumbLevel
        };
        multilevelFacets.push(facet);
    });

    return multilevelFacets;
};

export const getMultilevelFacetCoreMethods = (unbxdCore) => {
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
