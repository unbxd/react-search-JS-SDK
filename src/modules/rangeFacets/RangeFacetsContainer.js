import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import GenerateFacets from './GenerateFacets';
import { getRangeFacetCoreMethods, getFormattedRangeFacets } from './utils';

class RangeFacetsContainer extends React.PureComponent {
    getRangeFacetsProps() {
        const {
            unbxdCore,
            FacetItemComponent,
            enableApplyFilters,
            priceUnit,
            label,
            collapsible,
            onFacetClick,
            transform,
            enableViewMore,
            minViewMore
        } = this.props;

        const {
            getRangeFacets,
            setRangeFacet,
            applyRangeFacet,
            clearARangeFacet,
            selectedRangeFacets,
        } = getRangeFacetCoreMethods(unbxdCore);
        const applyMultiple = true;
        const rangeFacets = getRangeFacets();

        const formattedRangeFacets = getFormattedRangeFacets(
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
            FacetItemComponent,
            enableApplyFilters,
            priceUnit,
            label,
            collapsible,
            transform,
            enableViewMore,
            onFacetClick,
            minViewMore,
            unbxdCore
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
    FacetItemComponent: PropTypes.oneOfType([
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
