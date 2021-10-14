import React from 'react';

import { Breadcrumbs } from '../../../src/index';

export const BreadcrumbItemComponent = ({
    itemData,
    separator,
    idx,
    onClick
}) => {
    const { value } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <>
            {idx === 0 && <Root />}

            {separator}

            <div className="UNX-breadcrumbs-list-item" onClick={handleClick}>
                {value}
            </div>
        </>
    );
};
export const onBreadcrumbClick = (categoryObject) => {
    return true;
};
export const Root = () => <span className="UNX-breadcrumb__root">Home</span>;
export const separator = <span className="UNX-breadcrumb__separator">/</span>;

const Crumbs = () => {
    return (
        <Breadcrumbs
            separator={separator}
            breadcrumbItemComponent={<BreadcrumbItemComponent />}
            onBreadcrumbClick={onBreadcrumbClick}
        />
    );
};

export default Crumbs;
