import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../../components';

const SortByList = ({ sortBy, sortByOptions, onSortClick, SortItemComponent }) => {

    return (<div className='UNX-sortby-list'>
        <List
            idAttribute={'value'}
            items={sortByOptions}
            activeItem={sortBy}
            ListItem={SortItemComponent}
            onClick={onSortClick}
            className={'UNX-sortby-list-container'} />
    </div>)
}

SortByList.propTypes = {
    sortBy: PropTypes.shape({
        "label": PropTypes.string,
        "field": PropTypes.string,
        "order": PropTypes.string,
    }),
    sortByOptions: PropTypes.arrayOf(
        PropTypes.shape({
            "label": PropTypes.string,
            "field": PropTypes.string,
            "order": PropTypes.string,
        }))
        .isRequired,
    onSortClick: PropTypes.func.isRequired,
    SortItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

export default SortByList;
