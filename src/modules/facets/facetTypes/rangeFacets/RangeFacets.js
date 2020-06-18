import React from 'react';
import PropTypes from 'prop-types';

import { FacetsContextConsumer } from '../../context';
import GenerateFacets from './GenerateFacets';

const RangeFacets = () => {

    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { rangeFacets, selectedFacets, isApplyFilters, selectedRangeFacets } = data;
            const { addRangeFacet, applyRangeFacet, clearARangeFacet, trackActions } = helpers;


            return (<GenerateFacets
                rangeFacets={rangeFacets}
                selectedFacets={selectedFacets}
                isApplyFilters={isApplyFilters}
                selectedRangeFacets={selectedRangeFacets}
                addRangeFacet={addRangeFacet}
                applyRangeFacet={applyRangeFacet}
                clearARangeFacet={clearARangeFacet}
                trackActions={trackActions} />)
        }
        }</FacetsContextConsumer>)

}



export default RangeFacets;
