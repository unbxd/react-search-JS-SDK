import { paginationTypes } from '../config';

function setProductConfiguration(config) {
    const {
        pageSize,
        requiredFields,
        showVariants,
        variantsCount,
        variantRequiredFields,
        groupBy,
        paginationType
    } = config;

    this.state.unbxdCore.setProductAttributes(requiredFields);
    if (typeof showVariants === 'boolean')
        this.state.unbxdCore.setShowVariants(showVariants);
    if (showVariants === true) {
        this.state.unbxdCore.setVariantsCount(variantsCount);
        if (Object.keys(variantRequiredFields).length > 0)
            this.state.unbxdCore.setVariantAttributes(variantRequiredFields);
        if (groupBy.length > 0)
            this.state.unbxdCore.setVariantsGroupBy(groupBy);
    }

    if (
        paginationType === paginationTypes.INFINITE_SCROLL ||
        paginationType === paginationTypes.CLICK_N_SCROLL ||
        paginationType === paginationTypes.FIXED_PAGINATION
    ) {
        this.state.unbxdCore.options.pagination.type = paginationType;
    } else {
        this.state.unbxdCore.options.pagination.type =
            paginationTypes.FIXED_PAGINATION;
    }

    if (
        paginationType === paginationTypes.INFINITE_SCROLL ||
        paginationType === paginationTypes.CLICK_N_SCROLL
    ) {
        this.state.unbxdCore.setPageSize(pageSize);
    }

    this.setState((currentState) => {
        return {
            ...currentState,
            unbxdState: { ...currentState.unbxdState, paginationType }
        };
    });
}

export default setProductConfiguration;
