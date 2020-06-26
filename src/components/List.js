import React from 'react';
import PropTypes from 'prop-types';


const List = ({ items, activeItem, ListItem, idAttribute = "id", className = '', onClick, ...props }) => {
    return (<div className={`UNX-list ${className}`} onClick={onClick ? onClick : null}>
        {items.map(item => {

            const isActive = typeof activeItem === 'object' ?
                activeItem[idAttribute] === item[idAttribute] : activeItem === item[idAttribute];

            return <ListItem
                itemData={item}
                idAttribute={idAttribute}
                onClick={onClick ? onClick : null}
                isActive={isActive}
                {...props}
                key={item[idAttribute]} />
        })}
    </div>)
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    activeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    ListItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    idAttribute: PropTypes.string
}

export default List;