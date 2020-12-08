import React from 'react';
import PropTypes from 'prop-types';

import { SortByDropdown, SortByList } from './displayTypes';
import { displayTypes } from '../../config';

const SortWrapper = (props) => {
    const {
        sortOptions: sortByOptions,
        displayType,
        sortBy,
        noOfPages,
        onSortClick,
        sortItemComponent,
        label
    } = props;

    if (!(Array.isArray(sortByOptions) && sortByOptions.length)) {
        return null;
    }

    if (noOfPages === 0) {
        return null;
    }

    return (
        <div className="UNX-sortby__container">
            {label || null}
            {displayType === displayTypes.DROPDOWN && (
                <SortByDropdown
                    sortBy={sortBy}
                    sortByOptions={sortByOptions}
                    onSortClick={onSortClick}
                />
            )}

            {displayType === displayTypes.LIST && (
                <SortByList
                    sortByOptions={sortByOptions}
                    onSortClick={onSortClick}
                    sortItemComponent={sortItemComponent}
                />
            )}
        </div>
    );
};

SortWrapper.propTypes = {
    sortBy: PropTypes.object,
    noOfPages: PropTypes.number.isRequired,
    onSortClick: PropTypes.func.isRequired,
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            order: PropTypes.string
        })
    ).isRequired,
    displayType: PropTypes.string,
    sortItemComponent: PropTypes.element,
    label: PropTypes.node
};

export default SortWrapper;
