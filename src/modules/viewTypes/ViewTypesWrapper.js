import React from 'react';
import PropTypes from 'prop-types';

import { ViewTypesList, ViewTypesDropdown } from './displayTypes';
import { displayTypes } from '../../config';

const ViewTypesWrapper = (props) => {
    const {
        viewType,
        viewTypes,
        displayType,
        ViewItemComponent,
        numberOfProducts,
        validViewTypes,
        handleViewTypeClick,
    } = props;

    if (validViewTypes.length < 2 || numberOfProducts === 0) {
        return null;
    }
    return (
        <div className="UNX-viewTypes__container">
            {displayType === displayTypes.DROPDOWN && (
                <ViewTypesDropdown
                    viewType={viewType}
                    viewTypes={viewTypes}
                    onViewTypeClick={handleViewTypeClick}
                />
            )}

            {displayType === displayTypes.LIST && (
                <ViewTypesList
                    viewType={viewType}
                    viewTypes={viewTypes}
                    onViewTypeClick={handleViewTypeClick}
                    ViewItemComponent={ViewItemComponent}
                />
            )}
        </div>
    );
};

ViewTypesWrapper.propTypes = {
    viewType: PropTypes.string,
    viewTypes: PropTypes.arrayOf(
        PropTypes.shape({
            viewType: PropTypes.string.isRequired,
            isSelected: PropTypes.bool.isRequired,
        })
    ),
    displayType: PropTypes.string,
    numberOfProducts: PropTypes.number.isRequired,
    validViewTypes: PropTypes.array.isRequired,
    handleViewTypeClick: PropTypes.func.isRequired,
    ViewItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default ViewTypesWrapper;
