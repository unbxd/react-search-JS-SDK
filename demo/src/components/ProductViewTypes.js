import React from 'react';

import { ViewTypes } from '../../../src/index';

const viewTypes = ['GRID', 'LIST'];

export const ProductsViewItemComponent = ({ itemData, onClick }) => {
    const { viewType, isSelected } = itemData;
    const iconClassName = viewType === 'GRID' ? 'fa fa-th' : 'fa fa-th-list';
    const dataTestId = viewType === 'GRID' ? 'UNX_gridBtn' : 'UNX_listBtn';
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <div className="UNX-viewType__wrapper">
            <span
                className={`UNX-viewType__option ${
                    isSelected ? '-selected' : ''
                }`}
                data-testid={dataTestId}
                onClick={handleClick}
            >
                <i className={iconClassName} />
            </span>
        </div>
    );
};

export const ViewItemComponent = ({ itemData, onClick }) => {
    const { viewType, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <div className="UNX-viewType__wrapper">
            <span
                className={`UNX-viewType__option ${
                    isSelected ? '-selected' : ''
                }`}
                onClick={handleClick}
            >
                {viewType}
            </span>
        </div>
    );
};

const ProductViewTypes = () => {
    return (
        <ViewTypes
            viewTypes={viewTypes}
            displayType="LIST"
            viewItemComponent={<ProductsViewItemComponent />}
        />
    );
};

export default ProductViewTypes;
