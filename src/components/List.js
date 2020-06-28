import React from 'react';
import PropTypes from 'prop-types';

import { listItemTypes } from './utils';

const List = ({ items,
    activeItem,
    ListItem,
    idAttribute = "id",
    className = '',
    onClick,
    itemsType = listItemTypes.OBJECT,
    ...props }) => {
    return (<div className={`UNX-list ${className}`} onClick={onClick ? onClick : null}>
        {items.map((item, idx) => {

            let isActive = false;
            if (itemsType === listItemTypes.PRIMITIVE) {
                isActive = item === activeItem;
            } else {
                isActive = typeof activeItem === 'object' ?
                    activeItem[idAttribute] === item[idAttribute] : activeItem === item[idAttribute];

            }


            const key = itemsType === listItemTypes.PRIMITIVE ? item : item[idAttribute];

            return <ListItem
                itemData={item}
                idAttribute={key}
                onClick={onClick ? onClick : null}
                isActive={isActive}
                idx={idx}
                {...props}
                key={key} />
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