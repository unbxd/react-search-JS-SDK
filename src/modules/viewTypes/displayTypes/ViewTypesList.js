import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../components';

const ViewTypesList = ({ viewTypes, onViewTypeClick, ViewItemComponent }) => {
    return (
        <List
            idAttribute={'viewType'}
            items={viewTypes}
            ListItem={ViewItemComponent}
            onClick={onViewTypeClick}
            className={'UNX-viewTypes__list'}
        />
    );
};

ViewTypesList.propTypes = {
    viewTypes: PropTypes.arrayOf(
        PropTypes.shape({
            viewType: PropTypes.string.isRequired,
            isSelected: PropTypes.bool.isRequired,
        })
    ),
    onViewTypeClick: PropTypes.func.isRequired,
    ViewItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default ViewTypesList;
