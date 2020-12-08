import { viewTypes, paginationTypes } from '../config';

function handleViewTypeClick(viewOption) {
    const viewType = viewOption.target
        ? viewOption.target.value
        : viewOption.viewType;
    this.state.unbxdCore.options.extraParams['viewType'] = viewType;
    const { unbxdCore, unbxdState } = this.state;
    if (
        unbxdState.paginationType === paginationTypes.INFINITE_SCROLL ||
        unbxdState.paginationType === paginationTypes.CLICK_N_SCROLL
    ) {
        unbxdCore.setPageStart(0);
    }
    unbxdCore.getResults();
    this.setState((currentState) => {
        if (viewType === viewTypes.GRID)
            return {
                ...currentState,
                unbxdState: {
                    ...currentState.unbxdState,
                    viewType: viewTypes.GRID
                }
            };
        return {
            ...currentState,
            unbxdState: {
                ...currentState.unbxdState,
                viewType: viewTypes.LIST
            }
        };
    });
}

export default handleViewTypeClick;
