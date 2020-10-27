import { viewTypes } from '../config';

function handleViewTypeClick(viewOption) {
    const viewType = viewOption.target
        ? viewOption.target.value
        : viewOption.viewType;
    this.state.unbxdCore.options.extraParams['viewType'] = viewType;
    this.state.unbxdCore.getResults();
    this.setState((currentState) => {
        if (viewType === viewTypes.GRID)
            return {
                ...currentState,
                unbxdState: {
                    ...currentState.unbxdState,
                    viewType: viewTypes.GRID,
                },
            };
        else
            return {
                ...currentState,
                unbxdState: {
                    ...currentState.unbxdState,
                    viewType: viewTypes.LIST,
                },
            };
    });
}

export default handleViewTypeClick;
