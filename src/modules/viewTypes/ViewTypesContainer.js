import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getProductViewType } from './utils';
import ViewTypesWrapper from './ViewTypesWrapper';
import { searchStatus } from '../../config';

class ViewTypesContainer extends React.PureComponent {
    componentDidMount() {
        const {
            helpers: { setViewTypeConfiguration },
            viewType,
            viewTypes,
            unbxdCore
        } = this.props;

        const currentViewType = unbxdCore.getQueryParams()['viewType'];
        if (currentViewType) {
            setViewTypeConfiguration({ viewType: currentViewType });
        } else {
            setViewTypeConfiguration({ viewType: viewType || viewTypes[0] });
        }
    }

    getViewTypesProps() {
        const {
            unbxdCore,
            viewType,
            viewTypes,
            displayType,
            viewItemComponent,
            helpers: { handleViewTypeClick }
        } = this.props;

        const { numberOfProducts = 0 } = unbxdCore.getSearchResults() || {};
        const validViewTypes = getProductViewType(viewTypes);

        const formattedViewTypes = viewTypes.map((viewTypeOption) => {
            return {
                viewType: viewTypeOption,
                isSelected: viewTypeOption === viewType
            };
        });

        return {
            viewType,
            viewTypes: formattedViewTypes,
            displayType,
            viewItemComponent,
            handleViewTypeClick,
            numberOfProducts,
            validViewTypes
        };
    }

    componentDidUpdate(prevProps) {
        const {
            unbxdCore,
            unbxdCoreStatus,
            viewType,
            helpers: { setViewTypeConfiguration }
        } = this.props;

        const { viewType: currentViewType } = unbxdCore.getQueryParams();
        if (viewType !== prevProps.viewType && viewType !== currentViewType) {
            setViewTypeConfiguration({ viewType });
        } else if (
            currentViewType &&
            unbxdCoreStatus === searchStatus.LOADING &&
            viewType === prevProps.viewType &&
            viewType !== currentViewType
        ) {
            setViewTypeConfiguration({ viewType: currentViewType }, true);
        }
    }

    render() {
        const DefaultRender = ViewTypesWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getViewTypesProps(),
            DefaultRender
        );
    }
}

ViewTypesContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    viewType: PropTypes.string,
    viewTypes: PropTypes.arrayOf(PropTypes.string),
    displayType: PropTypes.string,
    viewItemComponent: PropTypes.element
};

export default ViewTypesContainer;
