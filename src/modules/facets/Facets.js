import React from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../common/context';
import { FacetsContextProvider } from './context'
import { TextFacets, RangeFacets, MultilevelFacets } from './facetTypes';
import { ApplyFacets, ClearFacets } from './actions';
import { SelectedFacets } from './selectedFacets';
import { conditionalRenderer } from '../../common/utils';
import { getFacetRow, isFacetSelected, manageStateTypes } from './utils';



/**
 * Component to render the facets. 
 * Facets handles text, range and categorical filters. 
 * Facets can be applied individually or at once.
 */
class Facets extends React.Component {

    constructor(props) {
        super(props);

        const { defaultFilters } = this.props;
        this.state = {
            selectedFacets: { ...defaultFilters },
        }

    }

    componentDidMount() {
        const { helpers: { setFacetConfiguration } } = this.context;

        const { defaultFilters,
            categoryDisplayName,
            categoryField,
            MultilevelFacetItemComponent,
            BreadcrumbItemComponent, } = this.props;

        //Set main config here
        setFacetConfiguration({ defaultFilters, categoryDisplayName, categoryField });
    }

    getFacetProps() {

        const { unbxdCore, helpers: { trackActions } } = this.context;
        const { isApplyFilters,
            isClearFilters,
            moveFacetsOnSelect,
            FacetItemComponent,
            ActiveFacetItemComponent,
            moveFacetsOnSelect,
            MultilevelFacetItemComponent,
            BreadcrumbItemComponent } = this.props;

        const updateFacets = unbxdCore.updateFacets.bind(unbxdCore);
        const deleteAFacet = unbxdCore.deleteAFacet.bind(unbxdCore);
        const applyFacets = unbxdCore.applyFacets.bind(unbxdCore);
        const clearFacets = unbxdCore.clearFacets.bind(unbxdCore);
        const getSelectedFacet = unbxdCore.getSelectedFacet.bind(unbxdCore);
        const getSelectedFacets = unbxdCore.getSelectedFacets.bind(unbxdCore);

        const setRangeFacet = unbxdCore.setRangeFacet.bind(unbxdCore);
        const applyRangeFacet = unbxdCore.applyRangeFacet.bind(unbxdCore);
        const clearARangeFacet = unbxdCore.clearARangeFacet.bind(unbxdCore);
        const selectedRangeFacets = unbxdCore.state.rangeFacet;

        const getBucketedFacets = unbxdCore.getBucketedFacets.bind(unbxdCore);
        const getSelectedBucketedFacet = unbxdCore.getSelectedBucketedFacet.bind(unbxdCore);
        const getBreadCrumbsList = unbxdCore.getBreadCrumbsList.bind(unbxdCore);
        const setCategoryFilter = unbxdCore.setCategoryFilter.bind(unbxdCore);
        const deleteCategoryFilter = unbxdCore.deleteCategoryFilter.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);


        //get text and range facets
        const textFacets = [];
        const rangeFacets = [];

        const fetchFacets = unbxdCore.getFacets();
        if (fetchFacets && fetchFacets.length) {
            textFacets.push(...fetchFacets)
        }

        const fetchRangeFacets = unbxdCore.getRangeFacets();
        if (fetchRangeFacets && fetchRangeFacets.length) {
            rangeFacets.push(...fetchRangeFacets);
        }

        const manageFacetState = (currentFacet = {}, selectedFacetName = '', selectedFacetId = 0, action) => {

            this.setState(({ selectedFacets }) => {

                let updatedSelectedFacets;
                switch (action) {

                    case manageStateTypes.ADD:

                        const { [selectedFacetName]: currentFacetListAdd = [], ...remainingStateAdd } = selectedFacets;
                        const updatedFacetArrayAdd = [
                            ...currentFacetListAdd,
                            currentFacet
                        ];
                        updatedSelectedFacets =
                            { ...remainingStateAdd, [selectedFacetName]: updatedFacetArrayAdd }
                        break;

                    case manageStateTypes.REMOVE:

                        const { [selectedFacetName]: currentFacetListRemove = [], ...remainingStateRemove } = selectedFacets;
                        const updatedFacetArrayRemove = currentFacetListRemove.
                            filter(fValue => fValue.dataId != selectedFacetId);
                        updatedSelectedFacets = updatedFacetArrayRemove.length ?
                            { ...remainingStateRemove, [selectedFacetName]: updatedFacetArrayRemove } :
                            { ...remainingStateRemove }

                        break;

                    case manageStateTypes.RESET:

                        const { [selectedFacetName]: currentFacetListReset, ...remainingStateReset } = selectedFacets;
                        updatedSelectedFacets = remainingStateReset;
                        break;

                    case manageStateTypes.CLEAR:

                        updatedSelectedFacets = {};
                        break;

                    default:
                        return null;

                }

                return {
                    selectedFacets: updatedSelectedFacets
                }
            })
        }

        const setSelectedFacets = (selectedFacets = {}) => {
            this.setState((currentState) => {
                return currentState.selectedFacets !== selectedFacets ? { selectedFacets } : null
            })
        }

        //Methods to handle click on facets
        const removeFacet = ({ selectedFacetName, selectedFacetId = null }) => {
            deleteAFacet(selectedFacetName, selectedFacetId);
            trackActions({ type: "FACETS_REMOVE", data: { selectedFacetName, selectedFacetId } });
        }

        const addFacet = ({ selectedFacetName, selectedFacetId, facetData }) => {
            updateFacets({ selectedFacetName, selectedFacetId, facetData });
            trackActions({ type: "FACETS_ADD", data: { selectedFacetName, selectedFacetId } });
        }

        const applyFilters = () => {
            applyFacets(this.state.selectedFacets);
            trackActions({ type: "FACETS_APPLY", data: this.state.selectedFacets });
        }

        const clearFilters = () => {
            clearFacets();
            manageFacetState(null, null, null,
                manageStateTypes.CLEAR);
            trackActions({ type: "FACETS_CLEAR" });
        }

        const addRangeFacet = ({ facetName, start, end }) => {
            setRangeFacet({ facetName, start, end });
        }

        const removeRangeFacet = ({ facetName, start, end }) => {
            setRangeFacet({ facetName, start, end });
        }

        const addCategoryFilter = (event) => {
            const { unx_categoryname: name, unx_level: level, unx_multilevelfield: parent } = event.target.dataset;
            const addCategoryObject = { parent, level, name };
            setCategoryFilter(addCategoryObject);
            getResults();
            trackActions({ type: "CATEGORY_FILTER_ADD", data: addCategoryObject });
        }

        const removeCategoryFilter = (event) => {
            const { unx_categoryname: name, unx_level: level, unx_multilevelfield: parent } = event.target.dataset;
            const removeCategoryObject = { parent, level, name };
            deleteCategoryFilter(removeCategoryObject);
            getResults();
            trackActions({ type: "CATEGORY_FILTER_REMOVE", data: removeCategoryObject });
        }


        const onFacetClick = (event) => {

            const { unx_name: selectedFacetName, unx_dataid: selectedFacetId } = event.target.dataset;

            const facetData = getSelectedFacet(selectedFacetName);
            const { values: facetValues = [] } = facetData;

            //add or delete from state
            const facetRow = getFacetRow(facetValues, selectedFacetId);
            const isSelected = isFacetSelected(this.state.selectedFacets, selectedFacetName, selectedFacetId);
            isApplyFilters && manageFacetState(facetRow, selectedFacetName, selectedFacetId,
                isSelected ? manageStateTypes.REMOVE : manageStateTypes.ADD);

            !isSelected && !isApplyFilters && addFacet({ selectedFacetName, selectedFacetId, facetData });
            isSelected && !isApplyFilters && removeFacet({ selectedFacetName, selectedFacetId });

        }

        const onFacetObjectReset = (event) => {

            const { unx_name } = event.target.dataset;
            removeFacet({ selectedFacetName: unx_name });
            manageFacetState(null, unx_name, null, manageStateTypes.RESET);
        }

        const selectedFacetsAPI = getSelectedFacets();


        const data = {
            textFacets,
            rangeFacets,
            isApplyFilters,
            isClearFilters,
            moveFacetsOnSelect,
            selectedFacetsAPI,
            selectedRangeFacets,
            ...this.state
        };
        const helpers = {
            onFacetClick,
            onFacetObjectReset,
            applyFilters,
            clearFilters,
            setSelectedFacets,
            FacetItemComponent,
            ActiveFacetItemComponent,
            addRangeFacet,
            applyRangeFacet,
            clearARangeFacet,
            trackActions,
            getBucketedFacets,
            getSelectedBucketedFacet,
            getBreadCrumbsList,
            addCategoryFilter,
            removeCategoryFilter,
            MultilevelFacetItemComponent,
            BreadcrumbItemComponent
        };

        return { data, helpers }

    }

    render() {

        const DefaultRender = <React.Fragment>
            <TextFacets />
            <RangeFacets />
            <ApplyFacets />
            <ClearFacets />
            <SelectedFacets />
        </React.Fragment>

        return (<FacetsContextProvider value={this.getFacetProps()}>
            {conditionalRenderer(this.props.children, this.getFacetProps(), DefaultRender)}
        </FacetsContextProvider>)
    }
}

Facets.contextType = AppContext;
Facets.TextFacets = TextFacets;
Facets.RangeFacets = RangeFacets;
Facets.MultilevelFacets = MultilevelFacets;
Facets.ApplyFacets = ApplyFacets;
Facets.ClearFacets = ClearFacets;
Facets.SelectedFacets = SelectedFacets;


Facets.defaultProps = {
    defaultFilters: {},
    applyFilters: false,
    clearFilters: false,
    moveFacetsOnSelect: false,
    categoryDisplayName: "",
    categoryField: ""
}

Facets.propTypes = {
    /**
    * Apply default filters which will be enabled on every request.
    */
    defaultFilters: PropTypes.object,
    /**
    * Enable apply facets behaviour
    */
    applyFilters: PropTypes.bool,
    /**
    * Enable clear all facets behaviour.
    */
    clearFilters: PropTypes.bool,
    /**
    * Move selected facets to a separate block
    */
    moveFacetsOnSelect: PropTypes.bool,
    /**
    * Custom Facet item component
    */
    FacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Custom active Facet item component
    */
    ActiveFacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Display name of the category
    */
    categoryDisplayName: PropTypes.string.isRequired,
    /**  
    * Category field in the feed
    */
    categoryField: PropTypes.string.isRequired,
    /**  
    * Custom Multilevel facet component
    */
    MultilevelFacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**  
    * Custom BreadCrumb component
    */
    BreadcrumbItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default Facets;
