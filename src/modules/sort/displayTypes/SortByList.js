import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../components';

const SortByList = ({ sortByOptions, onSortClick, sortItemComponent }) => {
    return (
        <List
            idAttribute="value"
            items={sortByOptions}
            ListItem={sortItemComponent}
            onClick={onSortClick}
            className="UNX-sortby__list"
            testId="UNX_unbxdSorter"
        />
    );
};

SortByList.propTypes = {
    sortByOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            order: PropTypes.string
        })
    ).isRequired,
    onSortClick: PropTypes.func.isRequired,
    sortItemComponent: PropTypes.element.isRequired
};

export default SortByList;
