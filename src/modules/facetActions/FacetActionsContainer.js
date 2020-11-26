import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getFacetCoreMethods } from './utils';
import { manageStateTypes } from '../../config';
import FacetActionsWrapper from './FacetActionsWrapper';
import { executeCallback } from '../../common/utils';

class FacetActionsContainer extends React.PureComponent {
    componentDidMount() {
        const {
            helpers: { setFacetsActionConfiguration }
        } = this.props;
        setFacetsActionConfiguration({ enable: true });
    }

    //a way to pass data to render props and our component
    getFacetActionsProps() {
        const {
            unbxdCore,
            showApplyFilter,
            showClearFilter,
            applyFilterComponent,
            clearFilterComponent,
            selectedFacets,
            helpers: { manageTextFacets },
            onApply,
            onClear
        } = this.props;

        const {
            applyFacets,
            clearFacets,
            selectedRangeFacets,
            clearARangeFacet,
            getPaginationInfo
        } = getFacetCoreMethods(unbxdCore);

        const { noOfPages = 0 } = getPaginationInfo() || {};

        const handleApplyFilter = () => {
            const onFinish = () => {
                //does not work if we pass it as it is.
                applyFacets({ ...selectedFacets });
            };
            executeCallback(onApply, [selectedFacets], onFinish);
        };

        const handleClearFilter = () => {
            const onFinish = () => {
                Object.keys(selectedRangeFacets).map((rangeFacetName) => {
                    clearARangeFacet(rangeFacetName);
                });
                clearFacets();
                manageTextFacets(null, null, null, manageStateTypes.CLEAR);
            };
            executeCallback(onClear, [selectedFacets], onFinish);
        };

        return {
            showApplyFilter,
            showClearFilter,
            onApplyFilter: handleApplyFilter,
            onClearFilter: handleClearFilter,
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
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    selectedFacets: PropTypes.object,
    showApplyFilter: PropTypes.bool,
    showClearFilter: PropTypes.bool,
    applyFilterComponent: PropTypes.element,
    clearFilterComponent: PropTypes.element,
    onApply: PropTypes.func,
    onClear: PropTypes.func
};

export default FacetActionsContainer;
