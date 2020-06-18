import React, { Fragment } from 'react';

import { FacetsContextConsumer } from '../../context';
import GenerateFacets from './generateFacets/GenerateFacets';
import BreadCrumbs from './breadCrumbs/BreadCrumbs';

const MultilevelFacets = () => {

    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { getBucketedFacets,
                addCategoryFilter,
                removeCategoryFilter,
                getSelectedBucketedFacet,
                getBreadCrumbsList,
                MultilevelFacetItemComponent,
                BreadcrumbItemComponent } = helpers;

            const bucketedFacets = getBucketedFacets();
            const selectedBucketedFacet = getSelectedBucketedFacet();
            const breadCrumbsList = getBreadCrumbsList();

            return (<Fragment>

                <BreadCrumbs
                    breadCrumbsList={breadCrumbsList}
                    removeCategoryFilter={removeCategoryFilter}
                    BreadcrumbItemComponent={BreadcrumbItemComponent}
                />

                <GenerateFacets bucketedFacets={bucketedFacets}
                    selectedBucketedFacet={selectedBucketedFacet}
                    addCategoryFilter={addCategoryFilter}
                    breadCrumbsList={breadCrumbsList}
                    MultilevelFacetItemComponent={MultilevelFacetItemComponent}
                />
            </Fragment>)
        }
        }</FacetsContextConsumer>)

}

export default MultilevelFacets;
