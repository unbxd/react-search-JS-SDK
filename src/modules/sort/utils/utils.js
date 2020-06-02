export const getFormattedSort = sortBy => {
    return { ...sortBy, value: `${sortBy.field}|${sortBy.order}` }
};

export const getSelectedSort = (selectedSort, sortOptions) => {
    return sortOptions.find(sortOption => (sortOption.value === selectedSort))
};
