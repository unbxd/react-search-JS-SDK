import React from 'react';

import { conditionalRenderer } from '../../common/utils';
import { getFacetRow, isFacetSelected, getFacetCoreMethods, getRangeFacetCoreMethods } from './utils';
import { manageStateTypes } from '../../config';
import GenerateCombinedFacets from './generateCombinedFacets';

class CombinedFacetsContainer extends React.PureComponent {
  componentDidMount() {
    const {
      helpers: { setTextFacetsConfiguration }
    } = this.props;
    let { defaultFilters } = this.props;
    defaultFilters = defaultFilters?defaultFilters:{};
    setTextFacetsConfiguration({ defaultFilters });
  }

  //a way to pass data to render props and our component
  getCombinedFacetsProps() {
    const {
      unbxdCore,
      unbxdCoreStatus,
      FacetItemComponent,
      enableApplyFilters,
      helpers: { manageTextFacets, setSelectedFacets },
      selectedFacets,
      label,
      textCollapsible,
      textSearchable,
      FacetSliderItemComponent,
      FacetListItemComponent,
      displayType,
      priceUnit,
      rangeCollapsible,
      sortCombinedFacets
    } = this.props;

    const {
      getFacets,
      updateFacets,
      deleteAFacet,
      getSelectedFacet,
      getSelectedFacets,
      setPageStart,
      getResults
    } = getFacetCoreMethods(unbxdCore);

    const{
      getRangeFacets,
      setRangeFacet,
      applyRangeFacet,
      clearARangeFacet,
      selectedRangeFacets
    }=getRangeFacetCoreMethods(unbxdCore);

    const textFacets = getFacets() || [];
    const rangeFacets = getRangeFacets() || [];

    const textFacetsWithType = textFacets && textFacets.length && textFacets.map((facet) => {
        facet.facetType = 'text';
        return facet;
    })
    const rangeFacetsWithType = rangeFacets && rangeFacets.length && rangeFacets.map((facet) => {
        facet.facetType = 'range';
        return facet;
    })
    let combinedFacets = textFacetsWithType && rangeFacetsWithType && textFacetsWithType.length && rangeFacetsWithType.length && [...textFacetsWithType, ...rangeFacetsWithType] || [];

    combinedFacets && combinedFacets.length && combinedFacets.sort((a, b) => {
        return a.position - b.position;
    });

    //Methods to handle click on facets
    const removeFacet = ({ selectedFacetName, selectedFacetId = null }) => {
      deleteAFacet(selectedFacetName, selectedFacetId);
    };

    const addFacet = ({ selectedFacetName, selectedFacetId, facetData }) => {
      updateFacets({ selectedFacetName, selectedFacetId, facetData });
    };

    const onFacetClick = (event) => {
      const {
        unx_name: selectedFacetName,
        unx_dataid: selectedFacetId
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
      enableApplyFilters &&
        manageTextFacets(
          facetRow,
          selectedFacetName,
          selectedFacetId,
          isSelected ? manageStateTypes.REMOVE : manageStateTypes.ADD
        );

      !isSelected &&
        !enableApplyFilters &&
        addFacet({ selectedFacetName, selectedFacetId, facetData });
      isSelected &&
        !enableApplyFilters &&
        removeFacet({ selectedFacetName, selectedFacetId });
    };

    const onFacetObjectReset = (event) => {
      const { unx_name } = event.target.dataset;
      removeFacet({ selectedFacetName: unx_name });
      setPageStart(0);
      getResults();
      manageTextFacets(null, unx_name, null, manageStateTypes.RESET);
    };
    
    const addRangeFacet = ({ facetName, start, end }, getResults = false) => {
        setRangeFacet({ facetName, start, end });
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

    const lastSelectedFacets = getSelectedFacets();

    const data = {
      unbxdCoreStatus,
      combinedFacets,
      enableApplyFilters,
      lastSelectedFacets,
      selectedFacets,
      textCollapsible,
      textSearchable,
      displayType,
      priceUnit,
      rangeCollapsible
    };

    const helpers = {
      onFacetClick,
      onFacetObjectReset,
      setSelectedFacets,
      FacetItemComponent,
      label,
      addRangeFacet,
      applyRangeFacet,
      removeRangeFacet,
      selectedRangeFacets,
      FacetSliderItemComponent,
      FacetListItemComponent,
      sortCombinedFacets
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

export default CombinedFacetsContainer;