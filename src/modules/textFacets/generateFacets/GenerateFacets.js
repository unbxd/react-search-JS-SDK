import React from 'react';
import PropTypes from 'prop-types';

import { isFacetSelected } from '../utils';
import { List } from '../../../components';
import FacetItem from './FacetItem';
import { searchStatus } from './../../../config';

class GenerateFacets extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      selectedFacets,
      lastSelectedFacets,
      setSelectedFacets,
      enableApplyFilters,
      unbxdCoreStatus
    } = this.props;
    if (
      prevProps.unbxdCoreStatus !== unbxdCoreStatus &&
      unbxdCoreStatus === searchStatus.READY &&
      selectedFacets !== lastSelectedFacets
    ) {
      setSelectedFacets(
        enableApplyFilters ? selectedFacets : lastSelectedFacets
      );
    }
  }

  render() {
    const {
      textFacets,
      selectedFacets,
      onFacetClick,
      onFacetObjectReset,
      FacetItemComponent,
      label
    } = this.props;

    if(textFacets.length===0){
      return null;
    }

    return (
      <div className="UNX-textFacet__container">
        {label?label:null}
        {textFacets.map(({ displayName, facetName, values }) => {
          //decide whether to show clear or not
          const hasActiveFacets = selectedFacets[facetName] ? true : false;

          return (
            <div className="UNX-textFacet__element" key={facetName}>
              <div className="UNX-textFacet__header" data-unx_name={facetName} >
                {displayName}

                {hasActiveFacets && (
                  <div
                    className="UNX-textFacet__header -clear"
                    data-unx_name={facetName}
                    onClick={onFacetObjectReset}
                  >
                    Clear
                  </div>
                )}
              </div>
              
                <List
                  items={values}
                  idAttribute={'dataId'}
                  ListItem={FacetItemComponent || FacetItem}
                  onClick={onFacetClick}
                  facetName={facetName}
                  className={'UNX-textFacet__list'}
                  isFacetSelected={isFacetSelected}
                  selectedFacets={selectedFacets}
                />
            </div>
          );
        })}
      </div>
    );
  }
}

GenerateFacets.propTypes = {
  textFacets: PropTypes.arrayOf(PropTypes.object),
  selectedFacets: PropTypes.object,
  lastSelectedFacets: PropTypes.object,
  onFacetClick: PropTypes.func.isRequired,
  onFacetObjectReset: PropTypes.func.isRequired,
  setSelectedFacets: PropTypes.func.isRequired,
  enableApplyFilters: PropTypes.bool.isRequired,
  unbxdCoreStatus: PropTypes.string.isRequired,
  FacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  label:PropTypes.node
};

export default GenerateFacets;
