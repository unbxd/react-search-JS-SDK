import React from 'react';


import { FacetsContextConsumer } from '../../context';
import GenerateFacets from './GenerateFacets';


const TextFacets = () => {
    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { textFacets, selectedFacets, isApplyFilters, selectedFacetsAPI } = data;
            const { onFacetClick, onFacetObjectReset, setSelectedFacets } = helpers;

            return (<GenerateFacets
                textFacets={textFacets}
                selectedFacets={selectedFacets}
                onFacetClick={onFacetClick}
                onFacetObjectReset={onFacetObjectReset}
                selectedFacetsAPI={selectedFacetsAPI}
                setSelectedFacets={setSelectedFacets}
                isApplyFilters={isApplyFilters} />)
        }}
    </FacetsContextConsumer>)
}

export default TextFacets;
