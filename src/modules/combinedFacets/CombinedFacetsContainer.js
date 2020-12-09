import React from 'react';
import PropTypes from 'prop-types';
import {
    conditionalRenderer,
    executeCallback,
    mergeFacets
} from '../../common/utils';
import {
    getTextFacetItem,
    getTextFacetFacetCoreMethods,
    getFormattedTextFacets
} from '../textFacets/utils';
import {
    getRangeFacetCoreMethods,
    getSelectedRangeFacets,
    getFormattedRangeFacets
} from '../rangeFacets/utils';
import { manageStateTypes } from '../../config';
import GenerateCombinedFacets from './generateCombinedFacets';

class CombinedFacetsContainer extends React.PureComponent {
    componentDidMount() {
        const { helpers, applyMultiple } = this.props;
        const { setRangeFacetsConfiguration } = helpers;
        setRangeFacetsConfiguration({ applyMultiple });
    }

    // a way to pass data to render props and our component
    getCombinedFacetsProps() {
        const {
            unbxdCore,
            unbxdCoreStatus,
            helpers: { manageTextFacets, manageRangeFacets },
            selectedTextFacets,
            selectedRangeFacets,
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
            getSelectedFacet,
            getSelectedFacets,
            updateFacets,
            deleteAFacet,
            setPageStart,
            getResults
        } = getTextFacetFacetCoreMethods(unbxdCore);

        const {
            getRangeFacets,
            setRangeFacet,
            applyRangeFacet,
            clearARangeFacet,
            lastSelectedRangeFacets
        } = getRangeFacetCoreMethods(unbxdCore);

        const textFacets = getFacets() || [];
        const lastSelectedTextFacets = getSelectedFacets();
        const rangeFacets = getRangeFacets() || [];

        // merge lastSelectedTextFacets and textFacets
        const formattedTextFacets = getFormattedTextFacets(
            textFacets,
            mergeFacets(selectedTextFacets, lastSelectedTextFacets)
        );

        const formattedLastSelectedRangeFacets = getSelectedRangeFacets(
            lastSelectedRangeFacets
        );
        const formattedRangeFacets = getFormattedRangeFacets(
            rangeFacets,
            mergeFacets(
                selectedRangeFacets,
                formattedLastSelectedRangeFacets,
                applyMultiple
            )
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

        // Methods to handle click on facets
        const addTextFacet = ({
            selectedFacetName,
            selectedFacetId,
            facetData
        }) => {
            updateFacets({ selectedFacetName, selectedFacetId, facetData });
        };

        const removeTextFacet = ({
            selectedFacetName,
            selectedFacetId = null
        }) => {
            deleteAFacet(selectedFacetName, selectedFacetId);
        };

        const handleTextFacetClick = (currentItem) => {
            const { facetName, dataId, isSelected = false } = currentItem;

            const facetData = getSelectedFacet(facetName);
            const { values: facetValues = [] } = facetData;

            // add or delete from state
            const facetRow = getTextFacetItem(facetValues, dataId);
            const eventType = isSelected
                ? manageStateTypes.REMOVE
                : manageStateTypes.ADD;
            const onFinish = () => {
                enableApplyFilters &&
                    manageTextFacets(facetRow, facetName, dataId, eventType);

                !isSelected &&
                    !enableApplyFilters &&
                    addTextFacet({
                        selectedFacetName: facetName,
                        selectedFacetId: dataId,
                        facetData
                    });
                isSelected &&
                    !enableApplyFilters &&
                    removeTextFacet({
                        selectedFacetName: facetName,
                        selectedFacetId: dataId
                    });
            };
            executeCallback(onFacetClick, [facetRow, eventType], onFinish);
        };

        const handleTextFacetClear = (event) => {
            const { unx_name: facetName } = event.target.dataset;
            const eventType = manageStateTypes.CLEAR;
            const onFinish = () => {
                if (enableApplyFilters) {
                    manageTextFacets(null, facetName, null, eventType);
                }

                removeTextFacet({ selectedFacetName: facetName });
                setPageStart(0);
                getResults();
            };
            executeCallback(onFacetClick, [{ facetName }, eventType], onFinish);
        };

        const handleRangeFacetClick = (currentItem) => {
            const {
                from,
                end,
                facetName,
                dataId,
                isSelected = false
            } = currentItem;
            const { dataId: valMin } = from;
            const { dataId: valMax } = end;

            const facetObj = { facetName, valMin, valMax, isSelected, dataId };
            const eventType = isSelected
                ? manageStateTypes.REMOVE
                : manageStateTypes.ADD;
            const onFinish = () => {
                enableApplyFilters &&
                    manageRangeFacets(facetObj, facetName, dataId, eventType);

                !isSelected &&
                    !enableApplyFilters &&
                    addRangeFacet(
                        {
                            facetName,
                            start: valMin,
                            end: valMax,
                            applyMultiple
                        },
                        true
                    );
                isSelected && applyMultiple;
                !enableApplyFilters &&
                    addRangeFacet(
                        {
                            facetName,
                            start: valMin,
                            end: valMax,
                            applyMultiple
                        },
                        true
                    );

                isSelected &&
                    !applyMultiple &&
                    !enableApplyFilters &&
                    removeRangeFacet(facetName, true);
            };
            executeCallback(onFacetClick, [facetObj, eventType], onFinish);
        };

        const handleRangeFacetClear = (event) => {
            const { unx_facetname: facetName } = event.target.dataset;

            const eventType = manageStateTypes.CLEAR;
            const onFinish = () => {
                if (enableApplyFilters) {
                    manageRangeFacets(null, facetName, null, eventType);
                }

                removeRangeFacet(facetName);
                setPageStart(0);
                getResults();
            };
            executeCallback(onFacetClick, [{ facetName }, eventType], onFinish);
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

        const removeRangeFacet = (facetName, getResults = false) => {
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
            onRangeFacetClick: handleRangeFacetClick,
            onRangeFacetClear: handleRangeFacetClear,
            textFacetItemComponent,
            label,
            addRangeFacet,
            applyRangeFacet,
            removeRangeFacet,
            selectedRangeFacets,
            selectedTextFacets,
            manageTextFacets,
            manageRangeFacets,
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
    selectedRangeFacets: PropTypes.object,
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
