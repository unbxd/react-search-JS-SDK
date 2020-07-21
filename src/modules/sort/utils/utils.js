export const getFormattedSort = (sortBy, activeSort) => {

    const isSelected = activeSort === undefined ? false : `${sortBy.field}|${sortBy.order}` === activeSort.value;
    return { ...sortBy, value: `${sortBy.field}|${sortBy.order}`, isSelected }
};

export const getSelectedSort = (selectedSort, sortOptions) => {
    return sortOptions.find(sortOption => (sortOption.value === selectedSort))
};
