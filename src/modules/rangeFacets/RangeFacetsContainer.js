import React from 'react';
import PropTypes from 'prop-types';

import {
    conditionalRenderer,
    executeCallback,
    mergeFacets
} from '../../common/utils';
import GenerateFacets from './generateFacets';
import {
    getRangeFacetCoreMethods,
    getFormattedRangeFacets,
    getSelectedRangeFacets
} from './utils';
import { manageStateTypes } from '../../config';

class RangeFacetsContainer extends React.PureComponent {
    componentDidMount() {
        const { helpers, applyMultiple } = this.props;
        const { setRangeFacetsConfiguration } = helpers;
        setRangeFacetsConfiguration({ applyMultiple });
    }

    componentDidUpdate(prevProps) {
        const {
            unbxdCore,
            unbxdCoreStatus,
            helpers: { manageRangeFacets }
        } = this.props;
        const { lastSelectedRangeFacets } = getRangeFacetCoreMethods(unbxdCore);
        const formattedLastSelectedRangeFacets = getSelectedRangeFacets(
            lastSelectedRangeFacets
        );
        if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === 'READY' &&
            Object.keys(formattedLastSelectedRangeFacets).length
        ) {
            manageRangeFacets(null, null, null, manageStateTypes.SET);
        }
    }

    getRangeFacetsProps() {
        const {
            unbxdCore,
            facetItemComponent,
            enableApplyFilters,
            selectedRangeFacets,
            priceUnit,
            label,
            collapsible,
            onFacetClick,
            helpers,
            transform,
            enableViewMore,
            minViewMore,
            applyMultiple
        } = this.props;

        const {
            getRangeFacets,
            setRangeFacet,
            applyRangeFacet,
            clearARangeFacet,
            lastSelectedRangeFacets,
            setPageStart,
            getResults
        } = getRangeFacetCoreMethods(unbxdCore);
        const { manageRangeFacets } = helpers;

        const rangeFacets = getRangeFacets();

        const formattedLastSelectedRangeFacets = getSelectedRangeFacets(
            lastSelectedRangeFacets
        );
        const formattedRangeFacets = getFormattedRangeFacets(
            rangeFacets,
            mergeFacets(
                selectedRangeFacets,
                formattedLastSelectedRangeFacets,
                applyMultiple
            )
        );

        const handleFacetClick = (currentItem) => {
            const {
                from,
                end,
                facetName,
                dataId,
                isSelected = false
            } = currentItem;
            const { dataId: valMin } = from;
            const { dataId: valMax } = end;

            const facetObj = { facetName, valMin, valMax, isSelected, dataId };
            const eventType = isSelected
                ? manageStateTypes.REMOVE
                : manageStateTypes.ADD;
            const onFinish = () => {
                enableApplyFilters &&
                    manageRangeFacets(facetObj, facetName, dataId, eventType);

                !isSelected &&
                    !enableApplyFilters &&
                    addRangeFacet(
                        {
                            facetName,
                            start: valMin,
                            end: valMax,
                            applyMultiple
                        },
                        true
                    );
                isSelected &&
                    applyMultiple &&
                    !enableApplyFilters &&
                    addRangeFacet(
                        {
                            facetName,
                            start: valMin,
                            end: valMax,
                            applyMultiple
                        },
                        true
                    );

                isSelected &&
                    !applyMultiple &&
                    !enableApplyFilters &&
                    removeRangeFacet(facetName, true);
            };
            executeCallback(onFacetClick, [facetObj, eventType], onFinish);
        };

        const handleFacetClear = (event) => {
            const { unx_facetname: facetName } = event.target.dataset;

            const eventType = manageStateTypes.CLEAR;
            const onFinish = () => {
                if (enableApplyFilters) {
                    manageRangeFacets(null, facetName, null, eventType);
                }

                removeRangeFacet(facetName);
                setPageStart(0);
                getResults();
            };
            executeCallback(onFacetClick, [{ facetName }, eventType], onFinish);
        };

        const addRangeFacet = (
            { facetName, start, end },
            getResults = false
        ) => {
            setRangeFacet({ facetName, start, end, applyMultiple });
            if (getResults) {
                applyRangeFacet();
            }
        };

        const removeRangeFacet = (facetName, getResults = false) => {
            clearARangeFacet(facetName);
            if (getResults) {
                applyRangeFacet();
            }
        };

        return {
            rangeFacets: formattedRangeFacets,
            selectedRangeFacets,
            lastSelectedRangeFacets: formattedLastSelectedRangeFacets,
            onFacetClick: handleFacetClick,
            onFacetClear: handleFacetClear,
            manageRangeFacets,
            addRangeFacet,
            applyRangeFacet,
            removeRangeFacet,
            facetItemComponent,
            enableApplyFilters,
            priceUnit,
            label,
            collapsible,
            transform,
            enableViewMore,
            minViewMore,
            unbxdCore,
            applyMultiple
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
    helpers: PropTypes.object.isRequired,
    facetItemComponent: PropTypes.element,
    enableApplyFilters: PropTypes.bool.isRequired,
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    applyMultiple: PropTypes.bool,
    onFacetClick: PropTypes.func,
    transform: PropTypes.func
};

export default RangeFacetsContainer;
