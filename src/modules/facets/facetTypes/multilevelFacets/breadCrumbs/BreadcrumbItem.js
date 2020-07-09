import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../../../components';

const BreadCrumbItem = ({ itemData, onClick }) => {

    const { value, filterField, level } = itemData;
    return (<Button
        data-unx_categoryname={value}
        data-unx_multilevelfield={filterField}
        data-unx_level={level}
        className={'UNX-breadcrumb__item'}
        onClick={onClick}
    >
        {value}
    </Button>)
}

BreadCrumbItem.propTypes = {
    itemData: PropTypes.shape({
        value: PropTypes.string,
        level: PropTypes.number,
        filterField: PropTypes.string
    }).isRequired,
}

export default BreadCrumbItem;
