import React from 'react';
import PropTypes from 'prop-types';
import { conditionalRenderer } from '../../common/utils';
import {
    getTextFacetItem,
    getTextFacetFacetCoreMethods,
    getFormattedTextFacets
} from '../textFacets/utils';
import {
    getRangeFacetCoreMethods,
    getFormattedRangeFacets
} from '../rangeFacets/utils';
import {
    getFacetCoreMethods,
    getFormattedMultilevelFacets
} from '../multilevelFacets/utils';
import { manageStateTypes, productTypes, facetTypes } from '../../config';
import GenerateCombinedFacets from './generateCombinedFacets';
import { executeCallback } from '../../common/utils';

class CombinedFacetsContainer extends React.PureComponent {
    //a way to pass data to render props and our component
    getCombinedFacetsProps() {
        const {
            unbxdCore,
            unbxdCoreStatus,
            helpers: { manageTextFacets, setSelectedFacets },
            selectedFacets,
            textFacetItemComponent,
            enableApplyFilters,
            rangeFacetItemComponent,
            multilevelFacetItemComponent,
            priceUnit,
            transform,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore,
            label,
            onFacetClick
        } = this.props;

        const {
            getFacets,
            updateFacets,
            deleteAFacet,
            getSelectedFacet,
            getSelectedFacets,
            setPageStart,
            getResults
        } = getTextFacetFacetCoreMethods(unbxdCore);

        const {
            getRangeFacets,
            setRangeFacet,
            applyRangeFacet,
            clearARangeFacet,
            selectedRangeFacets
        } = getRangeFacetCoreMethods(unbxdCore);

        const {
            getBucketedFacets,
            getBreadCrumbsList,
            setCategoryFilter,
            deleteCategoryFilter,
        } = getFacetCoreMethods(unbxdCore);

        const textFacets = getFacets() || [];
        const lastSelectedFacets = getSelectedFacets();
        const applyMultiple = true;
        const rangeFacets = getRangeFacets() || [];
        const multilevelFacets = getBucketedFacets() || [];

        const formattedTextFacets = getFormattedTextFacets(
            textFacets,
            selectedFacets
        );

        const formattedRangeFacets = getFormattedRangeFacets(
            rangeFacets,
            selectedRangeFacets
        );
        const formattedMultilevelFacets = getFormattedMultilevelFacets(
            multilevelFacets,
            unbxdCore
        );
        const combinedFacets = [
            ...formattedTextFacets,
            ...formattedRangeFacets,
            ...formattedMultilevelFacets
        ];
        combinedFacets &&
            combinedFacets.length &&
            combinedFacets.sort((a, b) => {
                return a.position - b.position;
            });

        //Methods to handle click on facets
        const removeTextFacet = ({
            selectedFacetName,
            selectedFacetId = null
        }) => {
            deleteAFacet(selectedFacetName, selectedFacetId);
        };

        const addTextFacet = ({
            selectedFacetName,
            selectedFacetId,
            facetData
        }) => {
            updateFacets({ selectedFacetName, selectedFacetId, facetData });
        };

        const handleMultilevelFacetClick = (currentItem) => {
            const { name, filterField: parent, level } = currentItem;
            const categoryObject = { parent, level, name };
            const { helpers } = this.props;
            const { getUpdatedResults } = helpers;
            let highestBreadcrumbLevel = 0;

            const onFinish = () => {
                const { setCategoryId, options: { productType } } = unbxdCore;
                if (
                    productType === productTypes.CATEGORY &&
                    typeof setCategoryId === 'function'
                ) {
                    const getResults = setCategoryId(categoryObject, unbxdCore);
                    if (getResults) {
                        getUpdatedResults();
                    }
                } else {
                    const breadCrumbsList = getBreadCrumbsList(parent);
                    breadCrumbsList.map((breadcrumb) => {
                        console.log('breadcrumb', breadcrumb);
                        if (highestBreadcrumbLevel < breadcrumb.level) {
                            highestBreadcrumbLevel = breadcrumb.level;
                        }
                    });
                    if (highestBreadcrumbLevel === parseInt(level)) {
                        deleteCategoryFilter(categoryObject);
                    } else {
                        //check if it is a breadcrumb
                        const hit = breadCrumbsList.find(({ value }) => {
                            return name === value;
                        });

                        if (hit) {
                            deleteCategoryFilter(categoryObject);
                        } else {
                            setCategoryFilter(categoryObject);
                        }
                    }
                    getResults();
                }
            };

            executeCallback(onFacetClick, [categoryObject, facetTypes.MULTILEVEL_FACET], onFinish);
        };

        const handleTextFacetClick = (currentItem) => {
            const { facetName, dataId, isSelected = false } = currentItem;

            const facetData = getSelectedFacet(facetName);
            const { values: facetValues = [] } = facetData;

            //add or delete from state
            const facetRow = getTextFacetItem(facetValues, dataId);

            const onFinish = () => {
                enableApplyFilters &&
                    manageTextFacets(
                        facetRow,
                        facetName,
                        dataId,
                        isSelected
                            ? manageStateTypes.REMOVE
                            : manageStateTypes.ADD
                    );

                !isSelected &&
                    !enableApplyFilters &&
                    addFacet({
                        selectedFacetName: facetName,
                        selectedFacetId: dataId,
                        facetData
                    });
                isSelected &&
                    !enableApplyFilters &&
                    removeFacet({
                        selectedFacetName: facetName,
                        selectedFacetId: dataId
                    });
            };
            executeCallback(onFacetClick, [facetName, facetTypes.TEXT_FACET, !isSelected], onFinish);
        };

        const handleTextFacetClear = (event) => {
            const { unx_name } = event.target.dataset;

            const onFinish = () => {
                if (enableApplyFilters) {
                    manageTextFacets(
                        null,
                        unx_name,
                        null,
                        manageStateTypes.RESET
                    );
                }

                if (!enableApplyFilters) {
                    removeFacet({ selectedFacetName: unx_name });
                    setPageStart(0);
                    getResults();
                }
            };
            executeCallback(onFacetClick, [unx_name, facetTypes.TEXT_FACET, false], onFinish);
        };

        const addRangeFacet = (
            { facetName, start, end },
            getResults = false
        ) => {
            setRangeFacet({ facetName, start, end, applyMultiple });
            if (getResults) {
                applyRangeFacet();
            }
        };

        const removeRangeFacet = ({ facetName }, getResults = false) => {
            clearARangeFacet(facetName);
            if (getResults) {
                applyRangeFacet();
            }
        };

        const data = {
            unbxdCoreStatus,
            combinedFacets,
            enableApplyFilters,
            lastSelectedFacets,
            selectedFacets,
            priceUnit,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore
        };

        const helpers = {
            onTextFacetClick: handleTextFacetClick,
            onTextFacetClear: handleTextFacetClear,
            onMultilevelFacetClick: handleMultilevelFacetClick,
            setSelectedFacets,
            textFacetItemComponent,
            multilevelFacetItemComponent,
            label,
            addRangeFacet,
            applyRangeFacet,
            removeRangeFacet,
            selectedRangeFacets,
            rangeFacetItemComponent,
            transform
        };

        return { ...data, ...helpers };
    }

    render() {
        const DefaultRender = GenerateCombinedFacets;

        return conditionalRenderer(
            this.props.children,
            this.getCombinedFacetsProps(),
            DefaultRender
        );
    }
}
CombinedFacetsContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    priceUnit: PropTypes.string.isRequired,
    enableApplyFilters: PropTypes.bool.isRequired,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
    textFacetItemComponent: PropTypes.element,
    multilevelFacetItemComponent: PropTypes.element,
    rangeFacetItemComponent: PropTypes.element,
    transform: PropTypes.func,
    label: PropTypes.node,
    onFacetClick: PropTypes.node
};

export default CombinedFacetsContainer;
