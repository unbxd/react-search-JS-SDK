import React from 'react';
import PropTypes from 'prop-types';

import BreadCrumbItem from './BreadcrumbItem';
import { List } from '../../components';

const BreadcrumbsWrapper = (props) => {
    const {
        onBreadCrumbClick,
        breadCrumbsList,
        root,
        separator,
        breadcrumbItemComponent
    } = props;

    return breadCrumbsList.map((breadCrumbList) => {
        return (
            <div className={'UNX-breadcrumbs__container'}>
                <List
                    items={breadCrumbList}
                    idAttribute={'value'}
                    ListItem={breadcrumbItemComponent || BreadCrumbItem}
                    root={root}
                    separator={separator}
                    onClick={onBreadCrumbClick}
                    className={'UNX-breadcrumbs__list'}
                />
            </div>
        );
    });
};

BreadcrumbsWrapper.propTypes = {
    breadCrumbsList: PropTypes.array,
    onBreadCrumbClick: PropTypes.func.isRequired,
    root: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    separator: PropTypes.node,
    breadcrumbItemComponent: PropTypes.element
};

export default BreadcrumbsWrapper;
