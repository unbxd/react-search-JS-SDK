import React from 'react';
import PropTypes from 'prop-types';

import { ViewTypesList, ViewTypesDropdown } from './displayTypes';
import { displayTypes } from '../../config';

const ViewTypesWrapper = (props) => {
    const {
        viewType,
        viewTypes,
        displayType,
        viewItemComponent,
        numberOfProducts,
        validViewTypes,
        handleViewTypeClick
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
                    viewItemComponent={viewItemComponent}
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
            isSelected: PropTypes.bool.isRequired
        })
    ),
    displayType: PropTypes.string,
    numberOfProducts: PropTypes.number.isRequired,
    validViewTypes: PropTypes.array.isRequired,
    handleViewTypeClick: PropTypes.func.isRequired,
    viewItemComponent: PropTypes.element
};

export default ViewTypesWrapper;
