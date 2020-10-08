import React from 'react';

import { ViewTypes } from '@unbxd-ui/react-search-sdk';

const viewTypes = ['GRID', 'LIST'];

const ProductsViewItemComponent = ({ itemData, isActive, onClick }) => {
    const iconClassName = itemData === 'GRID' ? `fa fa-th` : `fa fa-th-list`;
    const dataTestId = itemData === 'GRID' ? `UNX_gridBtn` : `UNX_listBtn`;
    return (
        <div className="UNX-viewType__wrapper">
            <a
                className={`UNX-viewType__option ${isActive ? '-active' : ''}`}
                data-viewtype={itemData}
                data-testid={dataTestId}
                onClick={onClick}
            >
                <i className={iconClassName} data-viewtype={itemData}></i>
            </a>
        </div>
    );
};

const ProductViewTypes = () => {
    return (
        <ViewTypes
            viewTypes={viewTypes}
            displayType={'LIST'}
            ViewItemComponent={ProductsViewItemComponent}
        />
    );
};

export default ProductViewTypes;
