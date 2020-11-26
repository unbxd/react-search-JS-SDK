import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import {
    getTextFacetItem,
    getTextFacetFacetCoreMethods,
    getFormattedTextFacets
} from './utils';
import { manageStateTypes } from '../../config';
import GenerateFacets from './generateFacets';
import { executeCallback } from '../../common/utils';

class TextFacetsContainer extends React.PureComponent {
    //a way to pass data to render props and our component
    getTextFacetsProps() {
        const {
            unbxdCore,
            unbxdCoreStatus,
            facetItemComponent,
            enableApplyFilters,
            helpers: { manageTextFacets, setSelectedFacets },
            selectedFacets,
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

        //Methods to handle click on facets
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

        const handleFacetObjectReset = (event) => {
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

        const lastSelectedFacets = getSelectedFacets();

        //merge lastSelectedFacets and textFacets
        const formattedTextFacets = getFormattedTextFacets(
            textFacets,
            selectedFacets
        );

        const data = {
            unbxdCoreStatus,
            textFacets: formattedTextFacets,
            enableApplyFilters,
            lastSelectedFacets,
            selectedFacets,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore
        };

        const helpers = {
            onFacetClick: handleFacetClick,
            onFacetObjectReset: handleFacetObjectReset,
            setSelectedFacets,
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
    selectedFacets: PropTypes.object.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool.isRequired,
    searchable: PropTypes.bool.isRequired,
    onFacetClick: PropTypes.node
};

export default TextFacetsContainer;
