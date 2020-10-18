import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import GenerateFacets from './GenerateFacets';
import { getFacetCoreMethods, getFormattedFacets } from './utils';

class RangeFacetsContainer extends React.PureComponent {
    getRangeFacetsProps() {
        const {
            unbxdCore,
            FacetListItemComponent,
            enableApplyFilters,
            priceUnit,
            label,
            collapsible,
            onFacetClick,
            sortRangeFacets,
            enableViewMore,
        } = this.props;

        const {
            getRangeFacets,
            setRangeFacet,
            applyRangeFacet,
            clearARangeFacet,
            selectedRangeFacets,
        } = getFacetCoreMethods(unbxdCore);
        const applyMultiple = true;
        const rangeFacets = getRangeFacets();

        const formattedRangeFacets = getFormattedFacets(
            rangeFacets,
            selectedRangeFacets
        );

        const addRangeFacet = (
            { facetName, start, end },
            getResults = false
        ) => {
            setRangeFacet({ facetName, start, end, applyMultiple });
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

        return {
            rangeFacets: formattedRangeFacets,
            addRangeFacet,
            applyRangeFacet,
            removeRangeFacet,
            FacetListItemComponent,
            enableApplyFilters,
            priceUnit,
            label,
            collapsible,
            sortRangeFacets,
            enableViewMore,
            onFacetClick,
        };
    }

    render() {
        const DefaultRender = GenerateFacets;

        return conditionalRenderer(
            this.props.children,
            this.getRangeFacetsProps(),
            DefaultRender
        );
    }
}

RangeFacetsContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    FacetListItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    enableApplyFilters: PropTypes.bool.isRequired,
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    onFacetClick: PropTypes.node,
};

export default RangeFacetsContainer;
