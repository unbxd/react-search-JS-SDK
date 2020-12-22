import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer, executeCallback } from '../../common/utils';
import { getFacetCoreMethods, getParsedFacets } from './utils';
import { manageStateTypes } from '../../config';
import FacetActionsWrapper from './FacetActionsWrapper';

class FacetActionsContainer extends React.PureComponent {
    componentDidMount() {
        const {
            helpers: { setFacetsActionConfiguration }
        } = this.props;
        setFacetsActionConfiguration({ enable: true });
    }

    // a way to pass data to render props and our component
    getFacetActionsProps() {
        const {
            unbxdCore,
            showApplyFilter,
            showClearFilter,
            applyFilterComponent,
            clearFilterComponent,
            selectedTextFacets,
            selectedRangeFacets,
            applyMultiple,
            helpers: { manageTextFacets, manageRangeFacets, getAnalytics },
            onApply,
            onClear
        } = this.props;

        const {
            applyFacets,
            clearFacets,
            lastSelectedRangeFacets,
            setRangeFacet,
            clearARangeFacet,
            getPaginationInfo
        } = getFacetCoreMethods(unbxdCore);

        const { trackFacetClick } = getAnalytics();
        const query = unbxdCore.getSearchQuery() || '';

        const { noOfPages = 0 } = getPaginationInfo() || {};

        const applyFacetState = () => {
            manageTextFacets(null, null, null, manageStateTypes.APPLY);
            manageRangeFacets(null, null, null, manageStateTypes.APPLY);
        };

        const clearFacetState = () => {
            manageTextFacets(null, null, null, manageStateTypes.RESET);
            manageRangeFacets(null, null, null, manageStateTypes.RESET);
        };

        const handleApplyFilter = () => {
            const onFinish = () => {
                // apply range facets one by one
                const { list: applyRangeFacets } = selectedRangeFacets;
                const { list: applyTextFacets } = selectedTextFacets;

                unbxdCore.state.rangeFacet = {};
                Object.keys(applyRangeFacets).map((facetName) => {
                    applyRangeFacets[facetName].map((facetItem) => {
                        const { valMin, valMax } = facetItem;
                        setRangeFacet({
                            facetName,
                            start: valMin,
                            end: valMax,
                            applyMultiple
                        });
                    });
                });
                // does not work if we pass it as it is.
                applyFacets({ ...applyTextFacets });
                trackFacetClick(
                    query,
                    getParsedFacets(applyTextFacets, applyRangeFacets)
                );

                // remove everything from the state
                applyFacetState();
            };
            executeCallback(
                onApply,
                [selectedTextFacets, selectedRangeFacets],
                onFinish
            );
        };

        const handleClearFilter = () => {
            const onFinish = () => {
                Object.keys(lastSelectedRangeFacets).map((rangeFacetName) => {
                    clearARangeFacet(rangeFacetName);
                });
                clearFacets();

                // remove everything from the state
                clearFacetState();
            };
            executeCallback(
                onClear,
                [selectedTextFacets, selectedRangeFacets],
                onFinish
            );
        };

        return {
            showApplyFilter,
            showClearFilter,
            onApplyFilter: handleApplyFilter,
            onClearFilter: handleClearFilter,
            manageTextFacets,
            manageRangeFacets,
            noOfPages,
            applyFilterComponent,
            clearFilterComponent
        };
    }

    render() {
        const DefaultRender = FacetActionsWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getFacetActionsProps(),
            DefaultRender
        );
    }
}

FacetActionsContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    helpers: PropTypes.object.isRequired,
    selectedTextFacets: PropTypes.object,
    selectedRangeFacets: PropTypes.object,
    showApplyFilter: PropTypes.bool,
    showClearFilter: PropTypes.bool,
    applyMultiple: PropTypes.bool,
    applyFilterComponent: PropTypes.element,
    clearFilterComponent: PropTypes.element,
    onApply: PropTypes.func,
    onClear: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default FacetActionsContainer;
