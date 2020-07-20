import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../components';

const SortByList = ({ sortByOptions, onSortClick, SortItemComponent }) => {

    return (<List
        idAttribute={'value'}
        items={sortByOptions}
        ListItem={SortItemComponent}
        onClick={onSortClick}
        className={'UNX-sortby__list'} />)
}

SortByList.propTypes = {
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
