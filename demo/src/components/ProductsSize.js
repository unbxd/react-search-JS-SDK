import React from 'react';
import Select from 'react-select';
import { PageSize } from '@unbxd-ui/react-search-sdk';

export const sizeOptions = [
    { id: 5, value: '5', label: '5' },
    { id: 10, value: '10', label: '10' },
    { id: 15, value: '15', label: '15' },
    { id: 20, value: '20', label: '20' }
];

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

export const PageSizeItemDropdownComponent = ({
    sizeOptions,
    onPageSizeClick,
    noOfPages
}) => {
    if (noOfPages === 0) {
        return null;
    }

    //find the selected option
    const selectedOption = sizeOptions.find(
        (sizeOption) => sizeOption.isSelected
    );

    const handleChange = (selected) => {
        onPageSizeClick(selected);
    };
    return (
        <div className="UNX-pageSize__container">
            <label
                className="-label"
                id="UNX-pageSize__dropdown-label"
                htmlFor="UNX-pageSize__dropdown-input"
            >
                Products per page
            </label>
            <Select
                defaultValue={selectedOption}
                options={sizeOptions}
                value={selectedOption}
                onChange={handleChange}
                className="UNX-pageSize__dropdown UNX-dropdown-container"
                classNamePrefix="UNX-dropdown"
                aria-labelledby="UNX-pageSize__dropdown-label"
                inputId="UNX-pageSize__dropdown-input"
            />
        </div>
    );
};

const label = (
    <div className="-label" htmlFor={'UNX-pageSize__dropdown'}>
        Sort by
    </div>
);

// const ProductsSize = () => {
//     return (
//         <PageSize
//             sizeOptions={sizeOptions}
//             label={label}
//             // displayType={'LIST'}
//             // pageSizeItemComponent={<PageSizeItemComponent/>}
//         />
//     );
// };

const ProductsSize = () => {
    return (
        <PageSize sizeOptions={sizeOptions}>
            {({ sizeOptions, onPageSizeClick, size, noOfPages }) => {
                return (
                    <PageSizeItemDropdownComponent
                        sizeOptions={sizeOptions}
                        onPageSizeClick={onPageSizeClick}
                        size={size}
                        noOfPages={noOfPages}
                    />
                );
            }}
        </PageSize>
    );
};

export default ProductsSize;
