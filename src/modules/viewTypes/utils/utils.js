import { viewTypes } from '../../../config';

export const getProductViewType = (productViewTypes = []) => {
    const validViewTypes = productViewTypes.filter(
        (viewType) => viewTypes[viewType]
    );
    return validViewTypes.length ? validViewTypes : [viewTypes.GRID];
};
