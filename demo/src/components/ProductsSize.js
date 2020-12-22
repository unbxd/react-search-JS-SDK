import React from 'react';

import { PageSize } from '@unbxd-ui/react-search-sdk';

export const sizeOptions = [
    { id: 5, value: '5' },
    { id: 10, value: '10' },
    { id: 15, value: '15' },
    { id: 20, value: '20' }
];

const label = <div className="-label">Products per page</div>;

export const PageSizeItemComponent = ({ itemData, onClick }) => {
    const { value, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <button
            className={`UNX-pageSize__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            {value}
        </button>
    );
};

const ProductsSize = () => {
    return (
        <PageSize
            sizeOptions={sizeOptions}
            label={label}
            // displayType={'LIST'}
            // pageSizeItemComponent={<PageSizeItemComponent/>}
        />
    );
};

export default ProductsSize;
