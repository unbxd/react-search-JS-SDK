import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import ViewTypesContainer from './ViewTypesContainer';

/**
 * Component to manage the view type of products.
 * ViewType supports `GRID` view by default.
 */
const ViewTypes = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(ViewTypes.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    unbxdState
                } = appState;
                const { viewType } = unbxdState;

                return (
                    <ViewTypesContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        viewType={viewType}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

ViewTypes.displayName = 'ViewTypes';

ViewTypes.defaultProps = {
    viewTypes: ['GRID'],
    displayType: 'DROPDOWN'
};

ViewTypes.propTypes = {
    /**
     * Required ProductViewType.Possible options are`GRID` and `LIST`.
     */
    viewTypes: PropTypes.arrayOf(PropTypes.string),
    /**
     * Required ProductViewType Display type.Possible options are`LIST` and `DROPDOWN`.
     */
    displayType: PropTypes.string,
    /**
     * Custom `LIST` item component instance.
     */
    viewItemComponent: PropTypes.element
};

export default ViewTypes;
