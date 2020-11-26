function setSelectedFacets(selectedFacets = {}) {
    this.setState((currentState) => {
        if (currentState.unbxdState.selectedFacets !== selectedFacets) {
            return {
                ...currentState,
                unbxdState: { ...currentState.unbxdState, selectedFacets }
            };
        } else {
            return null;
        }
    });
}

export default setSelectedFacets;
