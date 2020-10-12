import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer, scrollTop } from '../../common/utils';
import { getFacetRow, isFacetSelected, getFacetCoreMethods } from './utils';
import { manageStateTypes } from '../../config';
import GenerateFacets from './generateFacets';
import { executeCallback } from '../../common/utils';

class TextFacetsContainer extends React.PureComponent {
    componentDidMount() {
        const {
            defaultFilters,
            unbxdCoreStatus,
            helpers: { setTextFacetsConfiguration },
        } = this.props;
        if (unbxdCoreStatus !== 'READY') {
            setTextFacetsConfiguration({ defaultFilters });
        }
    }

    //a way to pass data to render props and our component
    getTextFacetsProps() {
        const {
            unbxdCore,
            unbxdCoreStatus,
            FacetItemComponent,
            enableApplyFilters,
            helpers: { manageTextFacets, setSelectedFacets },
            selectedFacets,
            label,
            collapsible,
            searchable,
            onFacetClick,
        } = this.props;

        const {
            getFacets,
            updateFacets,
            deleteAFacet,
            getSelectedFacet,
            getSelectedFacets,
            setPageStart,
            getResults,
        } = getFacetCoreMethods(unbxdCore);

        const textFacets = getFacets() || [];

        //Methods to handle click on facets
        const removeFacet = ({ selectedFacetName, selectedFacetId = null }) => {
            deleteAFacet(selectedFacetName, selectedFacetId);
        };

        const addFacet = ({
            selectedFacetName,
            selectedFacetId,
            facetData,
        }) => {
            updateFacets({ selectedFacetName, selectedFacetId, facetData });
        };

        const handleFacetClick = (event) => {
            const {
                unx_name: selectedFacetName,
                unx_dataid: selectedFacetId,
            } = event.target.dataset;

            const facetData = getSelectedFacet(selectedFacetName);
            const { values: facetValues = [] } = facetData;

            //add or delete from state
            const facetRow = getFacetRow(facetValues, selectedFacetId);
            const isSelected = isFacetSelected(
                selectedFacets,
                selectedFacetName,
                selectedFacetId
            );

            const onFinish = () => {
                enableApplyFilters &&
                    manageTextFacets(
                        facetRow,
                        selectedFacetName,
                        selectedFacetId,
                        isSelected
                            ? manageStateTypes.REMOVE
                            : manageStateTypes.ADD
                    );

                !isSelected &&
                    !enableApplyFilters &&
                    addFacet({ selectedFacetName, selectedFacetId, facetData });
                isSelected &&
                    !enableApplyFilters &&
                    removeFacet({ selectedFacetName, selectedFacetId });
            };
            executeCallback(
                onFacetClick,
                [selectedFacetName, !isSelected],
                onFinish
            );
        };

        const onFacetObjectReset = (event) => {
            const { unx_name } = event.target.dataset;
            removeFacet({ selectedFacetName: unx_name });
            setPageStart(0);
            getResults();
            manageTextFacets(null, unx_name, null, manageStateTypes.RESET);
            scrollTop();
        };

        const lastSelectedFacets = getSelectedFacets();

        const data = {
            unbxdCoreStatus,
            textFacets,
            enableApplyFilters,
            lastSelectedFacets,
            selectedFacets,
            collapsible,
            searchable,
        };

        const helpers = {
            onFacetClick: handleFacetClick,
            onFacetObjectReset,
            setSelectedFacets,
            FacetItemComponent,
            label,
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
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    defaultFilters: PropTypes.object.isRequired,
    enableApplyFilters: PropTypes.bool.isRequired,
    selectedFacets: PropTypes.object.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool.isRequired,
    searchable: PropTypes.bool.isRequired,
    onFacetClick: PropTypes.node,
};

export default TextFacetsContainer;
