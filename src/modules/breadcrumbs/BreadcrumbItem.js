import React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from '../../common/utils';
import { Button } from '../../components';

const BreadCrumbItem = ({ itemData, root, separator, onClick, idx }) => {
    const { value } = itemData;

    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <>
            {idx === 0 && cloneElement(root)}
            {separator}
            <Button className="UNX-breadcrumb__item" onClick={handleClick}>
                {value}
            </Button>
        </>
    );
};

BreadCrumbItem.propTypes = {
    itemData: PropTypes.shape({
        value: PropTypes.string,
        level: PropTypes.number,
        filterField: PropTypes.string
    }).isRequired,
    root: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.node
    ]),
    separator: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    idx: PropTypes.number
};

export default BreadCrumbItem;
