import React from 'react';
import PropTypes from 'prop-types';

import FacetItem from './FacetItem';
import { List } from '../../../components';

const GenerateFacets = props => {
  const {
    bucketedFacets,
    addCategoryFilter,
    breadCrumbsList,
    FacetItemComponent,
    label
  } = props;

  if(bucketedFacets.length ===0 || (bucketedFacets.length && bucketedFacets[0].values.length===0)){
    return null;
  }
  
  return (
    <div className="UNX-bucketedFacet__container">
      {label?label:null}
      {bucketedFacets.map(bucketedFacet => {
        const {
          displayName,
          level,
          multiLevelField,
          values = []
        } = bucketedFacet;
        const breadCrumbsLength = breadCrumbsList.length;

        if (breadCrumbsLength === level || breadCrumbsLength > level) {
          return null;
        }

        return (
          <div className="UNX-bucketedFacet__element" key={multiLevelField}>
            <div className="UNX-bucketedFacet__header">{displayName}</div>
            <List
              items={values}
              ListItem={FacetItemComponent || FacetItem}
              idAttribute={'name'}
              level={level}
              multiLevelField={multiLevelField}
              onClick={addCategoryFilter}
              className="UNX-bucketedFacet__list"
            />
          </div>
        );
      })}
    </div>
  );
};

GenerateFacets.propTypes = {
  bucketedFacets: PropTypes.array.isRequired,
  addCategoryFilter: PropTypes.func.isRequired,
  breadCrumbsList: PropTypes.array.isRequired,
  FacetItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  label:PropTypes.node
};

export default GenerateFacets;
