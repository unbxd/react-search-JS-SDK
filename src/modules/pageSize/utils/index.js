export const getUpdatedOptions = (options, selectedItem) => {
    const updatedOptions = options.map((option) => ({
        ...option,
        isSelected: option.id === selectedItem
    }));

    return updatedOptions;
};
