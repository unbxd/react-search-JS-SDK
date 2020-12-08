import React from 'react';
import PropTypes from 'prop-types';
import { conditionalRenderer, executeCallback } from '../../common/utils';
import {
    getTextFacetItem,
    getTextFacetFacetCoreMethods,
    getFormattedTextFacets
} from '../textFacets/utils';
import {
    getRangeFacetCoreMethods,
    getFormattedRangeFacets
} from '../rangeFacets/utils';
import { manageStateTypes } from '../../config';
import GenerateCombinedFacets from './generateCombinedFacets';

class CombinedFacetsContainer extends React.PureComponent {
    // a way to pass data to render props and our component
    getCombinedFacetsProps() {
        const {
            unbxdCore,
            unbxdCoreStatus,
            helpers: { manageTextFacets },
            selectedTextFacets,
            textFacetItemComponent,
            enableApplyFilters,
            rangeFacetItemComponent,
            priceUnit,
            transform,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore,
            label,
            onFacetClick,
            applyMultiple
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

        const textFacets = getFacets() || [];
        const lastSelectedTextFacets = getSelectedFacets();
        const rangeFacets = getRangeFacets() || [];

        const formattedTextFacets = getFormattedTextFacets(
            textFacets,
            selectedTextFacets
        );

        const formattedRangeFacets = getFormattedRangeFacets(
            rangeFacets,
            selectedRangeFacets
        );

        const combinedFacets = [
            ...formattedTextFacets,
            ...formattedRangeFacets
        ];

        combinedFacets &&
            combinedFacets.length &&
            combinedFacets.sort((a, b) => {
                return a.position - b.position;
            });

        const handleTextFacetClick = (currentItem) => {
            const { facetName, dataId, isSelected = false } = currentItem;

            const facetData = getSelectedFacet(facetName);
            const { values: facetValues = [] } = facetData;

            // add or delete from state
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
            executeCallback(onFacetClick, [facetName, !isSelected], onFinish);
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
            executeCallback(onFacetClick, [unx_name], onFinish);
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
            lastSelectedTextFacets,
            selectedTextFacets,
            priceUnit,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore,
            applyMultiple
        };

        const helpers = {
            onTextFacetClick: handleTextFacetClick,
            onTextFacetClear: handleTextFacetClear,
            textFacetItemComponent,
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
    selectedTextFacets: PropTypes.object,
    enableApplyFilters: PropTypes.bool.isRequired,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
    textFacetItemComponent: PropTypes.element,
    rangeFacetItemComponent: PropTypes.element,
    transform: PropTypes.func,
    label: PropTypes.node,
    onFacetClick: PropTypes.node,
    applyMultiple: PropTypes.bool,
    enableViewMore: PropTypes.bool,
    minViewMore: PropTypes.number
};

export default CombinedFacetsContainer;
