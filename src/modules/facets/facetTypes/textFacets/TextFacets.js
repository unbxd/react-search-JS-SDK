import React from 'react';


import { FacetsContextConsumer } from '../../context';
import GenerateFacets from './GenerateFacets';


const TextFacets = () => {
    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { textFacets, selectedFacets, isApplyFilters, lastSelectedFacets } = data;
            const { onFacetClick,
                onFacetObjectReset,
                setSelectedFacets,
                FacetItemComponent } = helpers;

            return (<GenerateFacets
                textFacets={textFacets}
                selectedFacets={selectedFacets}
                onFacetClick={onFacetClick}
                onFacetObjectReset={onFacetObjectReset}
                lastSelectedFacets={lastSelectedFacets}
                setSelectedFacets={setSelectedFacets}
                isApplyFilters={isApplyFilters}
                FacetItemComponent={FacetItemComponent} />)
        }}
    </FacetsContextConsumer>)
}

export default TextFacets;
