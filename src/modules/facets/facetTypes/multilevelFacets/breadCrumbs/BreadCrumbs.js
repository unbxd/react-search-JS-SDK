import React from 'react';
import PropTypes from 'prop-types';

import BreadCrumbItem from './BreadcrumbItem';
import { List } from '../../../../../components'

const BreadCrumbs = ({ breadCrumbsList, removeCategoryFilter, BreadcrumbItemComponent }) => {

    return (<List
        items={breadCrumbsList}
        idAttribute={'value'}
        ListItem={BreadcrumbItemComponent || BreadCrumbItem}
        onClick={removeCategoryFilter}
        className={'UNX-breadcrumbs__container'} />)
}

BreadCrumbs.propTypes = {
    breadCrumbsList: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        level: PropTypes.number,
        filterField: PropTypes.string
    })).isRequired,
    removeCategoryFilter: PropTypes.func.isRequired
}

export default BreadCrumbs;
