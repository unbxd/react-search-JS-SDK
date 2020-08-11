import React from 'react';
import PropTypes from 'prop-types';

import { RangeSlider } from '../../components';
import { getSelectedRangeFacets, displayTypes, isFacetSelected } from './utils';
import { List } from '../../components';
import FacetListItem from './FacetListItem';

class GenerateFacets extends React.Component {
  state = {
    rangeValues: {}
  };

  setFacetValue(facetAddObj, getResults = false) {
    const { facetName, valMin, valMax } = facetAddObj;
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
    if (isSelected) {
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

  onRangeValueClick = (event) => {
    const facetInfo = event.target.dataset['unx_facetname'];
    const [facetName, ranges] = facetInfo.split('_');
    const [valMin, valMax] = ranges.split('-');

    const { enableApplyFilters } = this.props;
    this.setFacetValue({ facetName, valMin, valMax }, !enableApplyFilters);
  };

  componentDidUpdate(prevProps) {
    const { rangeFacets, selectedRangeFacets } = this.props;
    if (prevProps.rangeFacets !== rangeFacets) {
      let formattedSelectedFacets = {};
      if (Object.keys(selectedRangeFacets).length) {
        formattedSelectedFacets = getSelectedRangeFacets(selectedRangeFacets);
      }

      //set the state with starts and ends
      const currentFacetState = {};

      rangeFacets.map((facet) => {
        const { facetName, displayName, start, end, values } = facet;

        const sliderMin = parseInt(start);
        const sliderMax = parseInt(end);

        if (formattedSelectedFacets[facetName]) {
          const valMin = parseInt(formattedSelectedFacets[facetName]['valMin']);
          const valMax = parseInt(formattedSelectedFacets[facetName]['valMax']);

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

          currentFacetState[facetName] = {
            sliderMin,
            sliderMax,
            valMin,
            valMax,
            values: updatedValues,
            displayName,
            isSelected: true
          };
        } else {
          const valMin = sliderMin;
          const valMax = sliderMax;
          currentFacetState[facetName] = {
            sliderMin,
            sliderMax,
            valMin,
            valMax,
            displayName,
            values,
            isSelected: false
          };
        }
      });

      this.setState({ rangeValues: currentFacetState });
    }
  }

  render() {
    const { rangeValues } = this.state;
    const {
      FacetSliderItemComponent,
      FacetListItemComponent,
      displayType,
      priceUnit,
      label
    } = this.props;

    if (Object.keys(rangeValues).length === 0) {
      return null;
    }

    return (
      <div className="UNX-rangeFacet__container">
        {label ? label : null}
        {displayType === displayTypes.SLIDER &&
          Object.keys(rangeValues).map((facetName) => {
            const {
              sliderMin,
              sliderMax,
              valMin,
              valMax,
              displayName
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
              <div className="UNX-rangeFacet__element" key={facetName}>
                <div className="UNX-rangeFacet__header">{displayName}</div>
                <RangeSlider
                  unit={priceUnit}
                  name={facetName}
                  sliderMin={sliderMin}
                  sliderMax={sliderMax}
                  valMin={valMin}
                  valMax={valMax}
                  onChange={this.onSliderChange}
                />
                <div className="UNX-rangeFacet__actions">
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
            const { values, displayName, isSelected } = rangeValues[facetName];
            return (
              <div className="UNX-rangeFacet__element" key={facetName}>
                <div className="UNX-rangeFacet__headerContainer">
                  <div className="UNX-rangeFacet__header">{displayName}</div>
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
                <List
                  items={values}
                  ListItem={FacetListItemComponent || FacetListItem}
                  onClick={this.onRangeValueClick}
                  idAttribute={facetName}
                  facetName={facetName}
                  className="UNX-rangeFacet__list"
                  priceUnit={priceUnit}
                />
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
  label: PropTypes.node
};

export default GenerateFacets;
