import React from 'react';
import PropTypes from 'prop-types';

import {
    conditionalRenderer,
    mergeFacets,
    executeCallback
} from '../../common/utils';
import {
    getTextFacetItem,
    getTextFacetFacetCoreMethods,
    getFormattedTextFacets
} from './utils';
import { manageStateTypes } from '../../config';
import GenerateFacets from './generateFacets';

class TextFacetsContainer extends React.PureComponent {
    componentDidUpdate(prevProps) {
        const {
            unbxdCore,
            unbxdCoreStatus,
            helpers: { manageTextFacets }
        } = this.props;
        const { getSelectedFacets } = getTextFacetFacetCoreMethods(unbxdCore);
        const selectedTextFacets = getSelectedFacets();
        if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === 'READY' &&
            Object.keys(selectedTextFacets).length
        ) {
            manageTextFacets(null, null, null, manageStateTypes.SET);
        }
    }
    // a way to pass data to render props and our component
    getTextFacetsProps() {
        const {
            unbxdCore,
            unbxdCoreStatus,
            facetItemComponent,
            enableApplyFilters,
            helpers: { manageTextFacets },
            selectedTextFacets,
            label,
            collapsible,
            searchable,
            onFacetClick,
            transform,
            enableViewMore,
            minViewMore
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

        const textFacets = getFacets() || [];

        // Methods to handle click on facets
        const removeFacet = ({ selectedFacetName, selectedFacetId = null }) => {
            deleteAFacet(selectedFacetName, selectedFacetId);
        };

        const addFacet = ({
            selectedFacetName,
            selectedFacetId,
            facetData
        }) => {
            updateFacets({ selectedFacetName, selectedFacetId, facetData });
        };

        const handleFacetClick = (currentItem) => {
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
            executeCallback(onFacetClick, [facetRow, eventType], onFinish);
        };

        const handleFacetClear = (event) => {
            const { unx_name: facetName } = event.target.dataset;
            const eventType = manageStateTypes.CLEAR;
            const onFinish = () => {
                if (enableApplyFilters) {
                    manageTextFacets(
                        null,
                        facetName,
                        null,
                        manageStateTypes.RESET
                    );
                }

                removeFacet({ selectedFacetName: facetName });
                setPageStart(0);
                getResults();
            };
            executeCallback(onFacetClick, [{ facetName }, eventType], onFinish);
        };

        const lastSelectedTextFacets = getSelectedFacets();

        // merge lastSelectedTextFacets and textFacets
        const formattedTextFacets = getFormattedTextFacets(
            textFacets,
            mergeFacets(selectedTextFacets, lastSelectedTextFacets)
        );

        const data = {
            unbxdCoreStatus,
            textFacets: formattedTextFacets,
            enableApplyFilters,
            lastSelectedTextFacets,
            selectedTextFacets,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore
        };

        const helpers = {
            onFacetClick: handleFacetClick,
            onFacetClear: handleFacetClear,
            manageTextFacets,
            facetItemComponent,
            label,
            transform
        };

        return { ...data, ...helpers };
    }

    render() {
        const DefaultRender = GenerateFacets;

        return conditionalRenderer(
            this.props.children,
            this.getTextFacetsProps(),
            DefaultRender
        );
    }
}

TextFacetsContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    facetItemComponent: PropTypes.element,
    enableApplyFilters: PropTypes.bool.isRequired,
    selectedTextFacets: PropTypes.object.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool.isRequired,
    searchable: PropTypes.bool.isRequired,
    onFacetClick: PropTypes.func,
    transform: PropTypes.func
};

export default TextFacetsContainer;
