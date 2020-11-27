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
import { manageStateTypes } from '../../config';
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

        const textFacets = getFacets() || [];
        const lastSelectedFacets = getSelectedFacets();
        const applyMultiple = true;
        const rangeFacets = getRangeFacets() || [];

        const formattedTextFacets = getFormattedTextFacets(
            textFacets,
            selectedFacets
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
            setSelectedFacets,
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
    enableApplyFilters: PropTypes.bool.isRequired,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
    textFacetItemComponent: PropTypes.element,
    rangeFacetItemComponent: PropTypes.element,
    transform: PropTypes.func,
    label: PropTypes.node,
    onFacetClick: PropTypes.node
};

export default CombinedFacetsContainer;
