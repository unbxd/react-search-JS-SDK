import React from 'react';
import PropTypes from 'prop-types';

import { listItemTypes } from './utils';
import { isElement, cloneElement } from '../common/utils';

const List = ({
    items,
    ListItem,
    idAttribute = 'id',
    className = '',
    onClick,
    itemsType = listItemTypes.OBJECT,
    testId,
    ...props
}) => {
    return (
        <div className={className} data-testid={testId}>
            {items.map((item, idx) => {
                const key =
                    itemsType === listItemTypes.PRIMITIVE
                        ? item
                        : item[idAttribute];
                if (isElement(ListItem)) {
                    return cloneElement(ListItem, {
                        itemData: item,
                        idAttribute: key,
                        onClick: onClick || null,
                        idx,
                        ...props,
                        key
                    });
                }

                return (
                    <ListItem
                        itemData={item}
                        idAttribute={key}
                        onClick={onClick || null}
                        idx={idx}
                        {...props}
                        key={key}
                    />
                );
            })}
        </div>
    );
};

List.propTypes = {
    items: PropTypes.array.isRequired,
    ListItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    idAttribute: PropTypes.string,
    testId: PropTypes.string
};

export default List;
