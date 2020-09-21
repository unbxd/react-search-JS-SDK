import React from 'react';
import PropTypes from 'prop-types';

import { RangeSlider } from '../../components';
import { getSelectedRangeFacets, displayTypes, isFacetSelected } from './utils';
import { List } from '../../components';
import FacetListItem from './FacetListItem';

class GenerateFacets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeValues: {}
    };
  }

  setFacetValue(facetAddObj, getResults = false) {
    const { facetName, valMin, valMax } = facetAddObj;
    const { displayType } = this.props;
    const applyMutiple = displayType === displayTypes.LIST;
    const isSelected = isFacetSelected(facetAddObj, this.state.rangeValues);
    this.setState((currentFacetState) => {
      const rangeObject = currentFacetState.rangeValues[facetName];
      //also go into values and set the specific from to as is selected
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
        rangeValues: {
          ...currentFacetState.rangeValues,
          [facetName]: { ...rangeObject, valMin, valMax, values: updatedValues }
        }
      };
    });

    const { addRangeFacet, removeRangeFacet } = this.props;
    if (isSelected && !applyMutiple) {
      removeRangeFacet({ facetName }, getResults);
    } else {
      addRangeFacet({ facetName, start: valMin, end: valMax }, getResults);
    }
  }

  onSliderChange = (selectedRange) => {
    const facetName = selectedRange.name;
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

    const {
      [facetName]: currentFacet,
      ...otherFacets
    } = this.state.rangeValues;
    this.setState({
      rangeValues: {
        ...otherFacets,
        [facetName]: {
          ...currentFacet,
          valMin: currentFacet.sliderMin,
          valMax: currentFacet.sliderMax
        }
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

  handleCollapseToggle = (event) => {
    const facetId = event.target.dataset['unx_name'];
    this.setState((existingState) => {
      const currentFacet = existingState.rangeValues[facetId];
      return {
        ...existingState,
        rangeValues: { ...existingState.rangeValues, [facetId]: {...currentFacet,isOpen:!currentFacet.isOpen} }
      };
    });
  };

  handleFilterChange = (event) => {
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

  componentDidUpdate(prevProps) {
    const { rangeFacets, selectedRangeFacets } = this.props;
    if (prevProps.rangeFacets !== rangeFacets) {
      let formattedSelectedFacets = {};
      if (Object.keys(selectedRangeFacets).length) {
        formattedSelectedFacets = getSelectedRangeFacets(selectedRangeFacets);
      }

      this.setState((existingState) => {
        //set the state with starts and ends
        const updatedFacetState = {};

        rangeFacets.map((facet) => {
          const { facetName, displayName, start, end, values } = facet;

          const sliderMin = parseInt(start);
          const sliderMax = parseInt(end);

          if (formattedSelectedFacets[facetName]) {
            const selectedValues = formattedSelectedFacets[facetName];
            const valuesAggregator = [];
            selectedValues.map(selectedValue=>{

              const valMin = parseInt(
                selectedValue['valMin']
              );
              const valMax = parseInt(
                selectedValue['valMax']
              );
  
              values.map((rangeValues,idx) => {
                const { from, to, isSelected } = rangeValues;
                const { dataId: fromValue } = from;
                const { dataId: toValue } = to;
                const key = `${fromValue}_${toValue}`;
                const currentVal = valuesAggregator.find(val=>val[key]);
                if(currentVal === undefined || !currentVal[key]['isSelected']) {
                  const tempVal = {};
                  if (valMin >= fromValue && valMax <= toValue) {
                    tempVal[key] = { ...rangeValues, isSelected: true };
                  } else {
                    tempVal[key] = { ...rangeValues, isSelected: false };
                  }
                  valuesAggregator[idx] = tempVal;
                }
                
              });
  
              const aggregatedValues = valuesAggregator.map(val=>Object.values(val)[0])
              updatedFacetState[facetName] = {
                sliderMin,
                sliderMax,
                valMin,
                valMax,
                values: aggregatedValues,
                displayName,
                isSelected: true
              };
            })
            
          } else {
            const valMin = sliderMin;
            const valMax = sliderMax;
            updatedFacetState[facetName] = {
              sliderMin,
              sliderMax,
              valMin,
              valMax,
              displayName,
              values,
              isSelected: false
            };
          }
          const currentFacet = existingState.rangeValues[facetName];
          updatedFacetState[facetName]['isOpen'] = currentFacet
            ? currentFacet['isOpen']
            : true;
          updatedFacetState[facetName]['filter'] = currentFacet
            ? currentFacet['filter']
            : '';
        });
        return { rangeValues: updatedFacetState };
      });
    }
  }

  render() {
    const { rangeValues } = this.state;
    const {
      FacetSliderItemComponent,
      FacetListItemComponent,
      displayType,
      priceUnit,
      label,
      collapsible
    } = this.props;

    if (Object.keys(rangeValues).length === 0) {
      return null;
    }

    return (
      <div className="UNX-rangefacet__container">
        {label ? label : null}
        {displayType === displayTypes.SLIDER &&
          Object.keys(rangeValues).map((facetName) => {
            const {
              sliderMin,
              sliderMax,
              valMin,
              valMax,
              displayName,
              isOpen
            } = rangeValues[facetName];

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
            ) : (
              <div
                className={`UNX-facet__element ${isOpen ? 'open' : ''}`}
                key={facetName}
              >
                <div className="UNX-facet__header">
                  {displayName}
                  {collapsible && (
                    <span
                      className="-collapse-icon"
                      data-unx_name={facetName}
                      onClick={this.handleCollapseToggle}
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
          })}

        {displayType === displayTypes.LIST &&
          Object.keys(rangeValues).map((facetName) => {
            const { values, displayName, isSelected, isOpen } = rangeValues[
              facetName
            ];

            return (
              <div
                className={`UNX-facet__element ${isOpen ? 'open' : ''}`}
                key={facetName}
              >
                <div className="UNX-facet__headerContainer">
                  <div className="UNX-facet__header">
                    {displayName}
                    {collapsible && (
                      <span
                        className="-collapse-icon"
                        data-unx_name={facetName}
                        onClick={this.handleCollapseToggle}
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
                  className="UNX-facet__list"
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
              </div>
            );
          })}
      </div>
    );
  }
}

GenerateFacets.propTypes = {
  displayType: PropTypes.string,
  rangeFacets: PropTypes.array,
  selectedRangeFacets: PropTypes.object,
  enableApplyFilters: PropTypes.bool.isRequired,
  addRangeFacet: PropTypes.func.isRequired,
  applyRangeFacet: PropTypes.func.isRequired,
  removeRangeFacet: PropTypes.func.isRequired,
  FacetSliderItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  FacetListItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  priceUnit: PropTypes.string.isRequired,
  label: PropTypes.node,
  collapsible: PropTypes.bool
};

export default GenerateFacets;
