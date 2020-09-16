import { viewTypes } from '../config';

function handleViewTypeClick(event) {
  const viewType = event.target.dataset.viewtype || event.target.value;
  this.state.unbxdCore.options.extraParams['viewType'] = viewType;
  this.state.unbxdCore.getResults();
  this.setState(currentState => {
    if (viewType === viewTypes.GRID)
      return {
        ...currentState,
        unbxdState: { ...currentState.unbxdState, viewType: viewTypes.GRID }
      };
    else
      return {
        ...currentState,
        unbxdState: { ...currentState.unbxdState, viewType: viewTypes.LIST }
      };
  });
}

export default handleViewTypeClick;
