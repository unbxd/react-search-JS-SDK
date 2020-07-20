import React from 'react';

import { MultilevelFacets } from '@unbxd-ui/react-search-sdk';

const FacetItemComponent = ({ itemData, multiLevelField, level, onClick }) => {
    const { name, count } = itemData;
    return (      
        <div className='UNX-bucketedFacet__item' data-unx_categoryname={name} data-unx_multilevelfield={multiLevelField} data-unx_level={level} onClick={onClick}>
        <div className='-checkbox' data-unx_categoryname={name} data-unx_multilevelfield={multiLevelField} data-unx_level={level}></div>
        <div className='-label' data-unx_categoryname={name} data-unx_multilevelfield={multiLevelField} data-unx_level={level}>{name}</div>
        <div className='-count' data-unx_categoryname={name} data-unx_multilevelfield={multiLevelField} data-unx_level={level}>({count})</div>
</div>
    );
  };

const label = <div className="UNX-searchFacet__mainHeader">Filter By</div>;
const MultilevelFilters = () => {
    return (<MultilevelFacets 
        categoryDisplayName={'category'}
    categoryField={'categoryPath'}
    //defaultCategoryFilter={'All Products'}
    FacetItemComponent={FacetItemComponent}
    label={label}/>)
}

export default MultilevelFilters;
//UNX-bucketedFacet__item