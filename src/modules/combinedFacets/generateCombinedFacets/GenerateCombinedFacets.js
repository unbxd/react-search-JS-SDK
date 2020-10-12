import React from 'react';

import { isFacetSelected, getSelectedRangeFacets, displayTypes, isRangeFacetSelected } from '../utils';
import { List, Input } from '../../../components';
import FacetItem from './FacetItem';
import { RangeSlider } from '../../../components';
import FacetListItem from './FacetListItem';
import { searchStatus } from '../../../config';

class GenerateCombinedFacets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { combinedFacets: [] };
  }

  setFacetValue(facetAddObj, getResults = false) {
    const { facetName, valMin, valMax } = facetAddObj;
    const isSelected = isRangeFacetSelected(facetAddObj, this.state.combinedFacets);
    this.setState((combinedFacetsState) => {
      let interimCombinedFacets = [...combinedFacetsState.combinedFacets]
      interimCombinedFacets.map((combinedFacet)=>{
        if(combinedFacet.facetType === 'range'){
          const rangeObject = combinedFacet;
          const updatedValues = rangeObject.values.map((rangeValues) => {
            const { from, to } = rangeValues;
            const { dataId: fromValue } = from;
            const { dataId: toValue } = to;
    
            if (valMin >= fromValue && valMax <= toValue) {
              return { ...rangeValues, isSelected: true };
            } else {
              return { ...rangeValues, isSelected: false };
            }
          });
          return {
            ...rangeObject, valMin, valMax, values: updatedValues 
          };
        }
        return combinedFacet;
      })
      return {
        combinedFacets: [...interimCombinedFacets]
      }
    })

    const { addRangeFacet, removeRangeFacet } = this.props;
    if (isSelected) {
      removeRangeFacet({ facetName }, getResults);
    } else {
      addRangeFacet({ facetName, start: valMin, end: valMax }, getResults);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      unbxdCoreStatus,
      combinedFacets,
      enableApplyFilters,
      lastSelectedFacets,
      selectedFacets,
      selectedRangeFacets,
      setSelectedFacets,
      sortCombinedFacets
    } = this.props;
    if (
      prevProps.unbxdCoreStatus !== unbxdCoreStatus &&
      unbxdCoreStatus === searchStatus.READY &&
      selectedFacets !== lastSelectedFacets
    ) {
        let formattedSelectedRangeFacets = {};
      if (Object.keys(selectedRangeFacets).length) {
        formattedSelectedRangeFacets = getSelectedRangeFacets(selectedRangeFacets);
      }
      const formattedCombinedFacets = combinedFacets.map((combinedFacet) => {
        if(combinedFacet.facetType === 'text'){
            const matchcombinedFacet = this.state.combinedFacets.find(
                (facetObj) => facetObj.facetName === combinedFacet.facetName);
            return {
                ...combinedFacet,
                isOpen: matchcombinedFacet ? matchcombinedFacet.isOpen : true,
                filter: matchcombinedFacet ? matchcombinedFacet.filter : ''
            };
        } 
        const { facetName, displayName, start, end, values, position, facetType } = combinedFacet;
        const sliderMin = parseInt(start);
        const sliderMax = parseInt(end);

        let updatedFacet = {};

        if (Object.keys(formattedSelectedRangeFacets).length && formattedSelectedRangeFacets[facetName]) {
            const valMin = parseInt(
              formattedSelectedRangeFacets[facetName]['valMin']
            );
            const valMax = parseInt(
              formattedSelectedRangeFacets[facetName]['valMax']
            );

            const updatedValues = values.map((rangeValues) => {
              const { from, to } = rangeValues;
              const { dataId: fromValue } = from;
              const { dataId: toValue } = to;

              if (valMin >= fromValue && valMax <= toValue) {
                return { ...rangeValues, isSelected: true };
              } else {
                return { ...rangeValues, isSelected: false };
              }
            });

            updatedFacet= {
              facetName,
              sliderMin,
              sliderMax,
              valMin,
              valMax,
              values: updatedValues,
              displayName,
              isSelected: true,
              position,
              facetType
            };
        } else {
            const valMin = sliderMin;
            const valMax = sliderMax;
            updatedFacet = {
              facetName,
              sliderMin,
              sliderMax,
              valMin,
              valMax,
              displayName,
              values,
              isSelected: false,
              position,
              facetType
            };
        }
        const matchcombinedFacet = this.state.combinedFacets.find(
            (facetObj) => facetObj.facetName === facetName );
        return {
            ...updatedFacet,
            isOpen: matchcombinedFacet ? matchcombinedFacet.isOpen : true,
            filter: matchcombinedFacet ? matchcombinedFacet.filter : ''
        };

      });
      // sorting the array
      formattedCombinedFacets.sort((a, b) => {
        return a.position - b.position;
      });
      formattedCombinedFacets.map((combinedFacet)=>{
        combinedFacet.viewLess = false;
        combinedFacet.className = "UNX-facet__list";
        return combinedFacet;
      })
      if(sortCombinedFacets && typeof(sortCombinedFacets) === 'function'){
        let returnedFacets = sortCombinedFacets.call(formattedCombinedFacets);
        this.setState(() => {
          return { combinedFacets: returnedFacets };
        });
      }else{
        this.setState(() => {
          return { combinedFacets: formattedCombinedFacets };
        });
      }
      setSelectedFacets(
        enableApplyFilters ? selectedFacets : lastSelectedFacets
      );
    }
  }

  handleCollapseToggle = (event) => {
    const facetId = event.target.dataset['unx_name'];
    this.setState((currentState) => {
      const updatedCombinedFacets = currentState.combinedFacets.map((combinedFacet) => {
        if (facetId === combinedFacet.facetName) {
          return { ...combinedFacet, isOpen: !combinedFacet.isOpen };
        }
        return { ...combinedFacet };
      });

      return { ...currentState, combinedFacets: updatedCombinedFacets };
    });
  };

  handleFilterChange = (event) => {
    const facetId = event.target.name;
    const value = event.target.value;
    this.setState((currentState) => {
      const updatedCombinedFacets = currentState.combinedFacets.map((combinedFacet) => {
        if (facetId === combinedFacet.facetName) {
          return { ...combinedFacet, filter: value.toLowerCase() };
        }
        return { ...combinedFacet };
      });

      return { ...currentState, textFacets: updatedCombinedFacets };
    });
  };

  onSliderChange = (selectedRange) => {
    const facetName = selectedRange.facetName;
    const valMin = parseInt(selectedRange.valMin);
    const valMax = parseInt(selectedRange.valMax);

    const addFacetObj = { facetName, valMin, valMax };
    this.setFacetValue(addFacetObj);
  };

  onApplyFilter = () => {
    const { applyRangeFacet } = this.props;
    applyRangeFacet();
  };

  onClearFilter = (event) => {
    const facetName = event.target.dataset['unx_facetname'];

    const { removeRangeFacet } = this.props;
    removeRangeFacet({ facetName });

    this.setState((combinedFacetsState) => {
      let interimCombinedFacets = [...combinedFacetsState.combinedFacets]
      interimCombinedFacets.map((combinedFacet)=>{ 
        if(combinedFacet.facetName === facetName && combinedFacet.facetType === 'range'){
          const currentFacet = combinedFacet;
          currentFacet.valMin = currentFacet.sliderMin,
          currentFacet.valMax = currentFacet.sliderMax
          return combinedFacet;
        }
        return combinedFacet;
      })
      return {
        combinedFacets: [...interimCombinedFacets]
      }
    });
    this.onApplyFilter();
  };

  handleRangeValueClick = (event) => {
    const facetInfo = event.target.dataset['unx_facetname'];
    const [facetName, ranges] = facetInfo.split('_');
    const [valMin, valMax] = ranges.split('-');

    const { enableApplyFilters } = this.props;
    this.setFacetValue({ facetName, valMin, valMax }, !enableApplyFilters);
  };

  handleRangeCollapseToggle = (event) => {
    const facetId = event.target.dataset['unx_name'];
    this.setState((combinedFacetsState) => {
      let interimCombinedFacets = [...combinedFacetsState.combinedFacets]
      interimCombinedFacets.map((combinedFacet)=>{ 
        if(combinedFacet.facetName === facetId && combinedFacet.facetType === 'range'){
          const currentFacet = combinedFacet;
          currentFacet['isOpen'] = !currentFacet['isOpen'];
          return currentFacet;
        }
        return combinedFacet;
      })
      return {
        combinedFacets: [...interimCombinedFacets]
      }
    });
  };

  handleRangeFilterChange = (event) => {
    const facetId = event.target.name;
    const value = event.target.value;
    this.setState((existingState) => {
      const currentFacet = existingState.rangeValues[facetId];
      currentFacet['filter'] = value;
      return {
        ...existingState,
        rangeValues: { ...existingState.rangeValues, [facetId]: currentFacet }
      };
    });
  };

  toggleViewLess = (event) =>{
    const facetName = event.target.dataset['unx_name'];
    this.setState((combinedFacetsState) => {
      const interimCombinedFacets = combinedFacetsState.combinedFacets.map((combinedFacet)=>{ 
        if(combinedFacet.facetName === facetName){
          const currentFacet = {...combinedFacet};
          currentFacet['viewLess'] = !currentFacet['viewLess'];
          if(currentFacet['viewLess']){
            currentFacet.className = "UNX-facet__list UNX-facet__listShowLimited"
          }else{
            currentFacet.className = "UNX-facet__list"
          }
          return {...combinedFacet, viewLess: currentFacet['viewLess'], className: currentFacet["className"]};
        }
        return {...combinedFacet};
      })
      return {...combinedFacetsState, combinedFacets: interimCombinedFacets}
    });
  }

  render() {
    const {
      selectedFacets,
      onFacetClick,
      onFacetObjectReset,
      FacetItemComponent,
      label,
      textCollapsible,
      textSearchable,
      FacetSliderItemComponent,
      FacetListItemComponent,
      displayType,
      priceUnit,
      rangeCollapsible,
      enableViewMore
    } = this.props;

    const { combinedFacets } = this.state;

    if (combinedFacets.length === 0) {
      return null;
    }

    return (
        <div>
        {combinedFacets.map((combinedFacet) => {
            if(combinedFacet.facetType === 'text'){
                const {displayName, facetName, values, isOpen, filter, viewLess, className} = combinedFacet;
                const hasActiveFacets = selectedFacets[facetName] ? true : false;
                let filteredValues = values;
                if (filter.length > 0) {
                    filteredValues = values.filter((value) => {
                        return value.name.toLowerCase().includes(filter);
                    });
                }
            
                return (
                    <div className="UNX-textFacet__container">
                        <div className={`UNX-facet__element ${isOpen ? 'open' : ''}`} key={facetName}>
                            <div className="UNX-facet__header" data-unx_name={facetName}>
                                {displayName}
                                {textCollapsible && (
                                    <span
                                    className="-collapse-icon"
                                    data-unx_name={facetName}
                                    onClick={this.handleCollapseToggle}
                                    />
                                )}
                            </div> 
                            {textSearchable && isOpen && (
                                <div className="UNX-facetFilter__container">
                                    <Input
                                    className="-input"
                                    value={filter}
                                    name={facetName}
                                    onChange={this.handleFilterChange}
                                    />
                                </div>
                            )} 
                            <List
                                items={filteredValues}
                                idAttribute={'dataId'}
                                ListItem={FacetItemComponent || FacetItem}
                                onClick={onFacetClick}
                                facetName={facetName}
                                className={className}
                                isFacetSelected={isFacetSelected}
                                selectedFacets={selectedFacets}
                            />
                            {hasActiveFacets && (
                            <div
                                className="-clear"
                                data-unx_name={facetName}
                                onClick={onFacetObjectReset}
                            >
                                Clear
                            </div>
                            )}
                            {enableViewMore && isOpen?
                              (!viewLess) ? (
                                <div className="view-More"
                                  data-unx_name={facetName}
                                  onClick={this.toggleViewLess}>
                                  View Less
                                </div>
                              ):(
                                <div 
                                  className="view-More"
                                  data-unx_name={facetName}
                                  onClick={this.toggleViewLess}>
                                  View More
                                </div>
                              ): ""
                            }
                        </div>
                    </div>
                )
            }
            const {
                sliderMin,
                sliderMax,
                valMin,
                valMax,
                displayName,
                isOpen,
                facetName, 
                values,
                isSelected,
                viewLess, 
                className
              } = combinedFacet;
            
            if(displayType === displayTypes.SLIDER){
                return FacetSliderItemComponent ? (
                    <FacetSliderItemComponent
                      sliderMin={sliderMin}
                      sliderMax={sliderMax}
                      valMin={valMin}
                      valMax={valMax}
                      onChange={this.onSliderChange}
                      onClearFilter={this.onClearFilter}
                      onApplyFilter={this.onApplyFilter}
                      displayName={displayName}
                      key={facetName}
                    />
                ) :  (
                    <div
                      className={`UNX-facet__element ${isOpen ? 'open' : ''}`}
                      key={facetName}
                    >
                      <div className="UNX-facet__header">
                        {displayName}
                        {rangeCollapsible && (
                          <span
                            className="-collapse-icon"
                            data-unx_name={facetName}
                            onClick={this.handleRangeCollapseToggle}
                          />
                        )}
                      </div>
                      <RangeSlider
                        unit={priceUnit}
                        name={facetName}
                        sliderMin={sliderMin}
                        sliderMax={sliderMax}
                        valMin={valMin}
                        valMax={valMax}
                        onChange={this.onSliderChange}
                      />
                      <div className="UNX-facet__actions">
                        <div
                          className="-clear"
                          data-unx_facetname={facetName}
                          onClick={this.onClearFilter}
                        >
                          Clear
                        </div>
                        <div
                          className="-apply"
                          data-unx_facetname={facetName}
                          onClick={this.onApplyFilter}
                        >
                          Apply
                        </div>
                      </div>
                    </div>
                );
            }
            if(displayType === displayTypes.LIST){
                return (
                    <div className={`UNX-facet__element ${isOpen ? 'open' : ''}`} key={facetName}>
                      <div className="UNX-facet__headerContainer">
                        <div className="UNX-facet__header">
                          {displayName}
                          {rangeCollapsible && (
                            <span
                              className="-collapse-icon"
                              data-unx_name={facetName}
                              onClick={this.handleRangeCollapseToggle}
                            />
                          )}
                        </div>
                      </div>
                      <List
                        items={values}
                        ListItem={FacetListItemComponent || FacetListItem}
                        onClick={this.handleRangeValueClick}
                        idAttribute={facetName}
                        facetName={facetName}
                        className={className}
                        priceUnit={priceUnit}
                      />
                      {isSelected && (
                        <div
                          onClick={this.onClearFilter}
                          data-unx_facetname={facetName}
                          className="-clear"
                        >
                          Clear
                        </div>
                      )}
                      {enableViewMore && isOpen?
                        (!viewLess) ? (
                          <div className="view-More"
                            data-unx_name={facetName}
                            onClick={this.toggleViewLess}>
                            View Less
                          </div>
                        ):(
                          <div 
                            className="view-More"
                            data-unx_name={facetName}
                            onClick={this.toggleViewLess}>
                            View More
                          </div>
                        ): ""
                      }
                    </div>
                );
            }
        })}
      </div>
    );
  }
}

export default GenerateCombinedFacets;
