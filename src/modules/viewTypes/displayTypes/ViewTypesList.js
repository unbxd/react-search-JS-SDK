import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../components';
import { listItemTypes } from '../../../components/utils';

const ViewTypesList = ({
    viewType,
    viewTypes,
    onViewTypeClick,
    ViewItemComponent }) => {

    return (<List
        idAttribute={''}
        items={viewTypes}
        activeItem={viewType}
        ListItem={ViewItemComponent}
        onClick={onViewTypeClick}
        className={'UNX-viewTypes__list'}
        itemsType={listItemTypes.PRIMITIVE} />)
}

ViewTypesList.propTypes = {
    viewType: PropTypes.string,
    viewTypes: PropTypes.arrayOf(PropTypes.string),
    onViewTypeClick: PropTypes.func.isRequired,
    ViewItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default ViewTypesList;
