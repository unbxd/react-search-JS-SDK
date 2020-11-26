export const getFormattedSort = (sortBy, activeSort, idx) => {
    let isSelected =
        activeSort === undefined
            ? false
            : `${sortBy.field}|${sortBy.order}` === activeSort.value;
    isSelected = idx === 0 && activeSort.value === '' ? true : isSelected;
    return { ...sortBy, value: `${sortBy.field}|${sortBy.order}`, isSelected };
};

export const getSelectedSort = (selectedSort, sortOptions) => {
    return sortOptions.find((sortOption) => sortOption.value === selectedSort);
};
