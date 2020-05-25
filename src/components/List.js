import React from 'react';
import PropTypes from 'prop-types';

const List = ({ items, ListItem, idAttribute = "id", ...props }) => {
    return (items.map(item => {
        return <ListItem itemData={item} idAttribute={idAttribute} {...props} key={item[idAttribute]} />
    }))
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    ListItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    idAttribute: PropTypes.string.isRequired
}

export default List;
