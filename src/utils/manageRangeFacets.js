import { mergeFacets } from '../common/utils';
import { manageStateTypes } from '../config';
import {
    getSelectedRangeFacets,
    getRangeFacetCoreMethods
} from '../modules/rangeFacets/utils';

function manageRangeFacets(
    currentFacet = {},
    selectedFacetName = '',
    selectedFacetId = 0,
    action
) {
    this.setState((appState) => {
        const { unbxdState, ...remaningState } = appState;
        const { selectedRangeFacets, applyMultiple } = unbxdState;
        const { add, remove } = selectedRangeFacets;
        const { unbxdCore } = this.state;
        const { lastSelectedRangeFacets } = getRangeFacetCoreMethods(unbxdCore);
        const formattedLastSelectedRangeFacets = getSelectedRangeFacets(
            lastSelectedRangeFacets
        );
        const idAttr = applyMultiple ? 'dataId' : 'facetName';
        const selectedId = applyMultiple ? selectedFacetId : selectedFacetName;
        let updatedSelectedFacets;
        switch (action) {
            case manageStateTypes.ADD:
                {
                    const {
                        [selectedFacetName]: currentFacetListAdd = [],
                        ...remainingStateAdd
                    } = add;
                    const updatedFacetArrayAdd = [
                        ...currentFacetListAdd,
                        currentFacet
                    ];

                    const {
                        [selectedFacetName]: currentFacetListRemove = [],
                        ...remainingStateRemove
                    } = remove;
                    const updatedFacetArrayRemove = currentFacetListRemove.filter(
                        (fValue) => fValue[idAttr] !== selectedId
                    );

                    updatedSelectedFacets = {
                        add: {
                            ...remainingStateAdd,
                            [selectedFacetName]: updatedFacetArrayAdd
                        },
                        remove: {
                            ...remainingStateRemove,
                            [selectedFacetName]: updatedFacetArrayRemove
                        }
                    };

                    const list = mergeFacets(
                        updatedSelectedFacets,
                        formattedLastSelectedRangeFacets
                    );

                    updatedSelectedFacets = { ...updatedSelectedFacets, list };
                }
                break;

            case manageStateTypes.REMOVE:
                {
                    const {
                        [selectedFacetName]: currentFacetListAdd = [],
                        ...remainingStateAdd
                    } = add;
                    const updatedFacetArrayAdd = currentFacetListAdd.filter(
                        (fValue) => fValue[idAttr] !== selectedId
                    );

                    const {
                        [selectedFacetName]: currentFacetListRemove = [],
                        ...remainingStateRemove
                    } = remove;
                    const updatedFacetArrayRemove = [
                        ...currentFacetListRemove,
                        currentFacet
                    ];

                    updatedSelectedFacets = {
                        add: {
                            ...remainingStateAdd,
                            [selectedFacetName]: updatedFacetArrayAdd
                        },
                        remove: {
                            ...remainingStateRemove,
                            [selectedFacetName]: updatedFacetArrayRemove
                        }
                    };

                    const list = mergeFacets(
                        updatedSelectedFacets,
                        formattedLastSelectedRangeFacets
                    );

                    updatedSelectedFacets = { ...updatedSelectedFacets, list };
                }
                break;

            case manageStateTypes.APPLY: {
                updatedSelectedFacets = {
                    add: {},
                    remove: {}
                };

                const list = mergeFacets(
                    updatedSelectedFacets,
                    formattedLastSelectedRangeFacets
                );

                updatedSelectedFacets = { ...updatedSelectedFacets, list };

                break;
            }

            case manageStateTypes.SET: {
                updatedSelectedFacets = {
                    add: { ...add },
                    remove: { ...remove }
                };
                const list = mergeFacets(
                    updatedSelectedFacets,
                    formattedLastSelectedRangeFacets
                );

                updatedSelectedFacets = { ...updatedSelectedFacets, list };

                break;
            }

            case manageStateTypes.CLEAR: {
                const {
                    // eslint-disable-next-line no-unused-vars
                    [selectedFacetName]: ignoreCurrentFacetListAdd,
                    ...remainingStateAdd
                } = add;

                const {
                    // eslint-disable-next-line no-unused-vars
                    [selectedFacetName]: ignoreCurrentFacetListRemove,
                    ...remainingStateRemove
                } = remove;
                updatedSelectedFacets = {
                    add: { ...remainingStateAdd },
                    remove: { ...remainingStateRemove },
                    list: {}
                };
                break;
            }
            case manageStateTypes.RESET: {
                updatedSelectedFacets = { add: {}, remove: {}, list: {} };
                break;
            }
            default:
                return null;
        }

        return {
            ...remaningState,
            unbxdState: {
                ...unbxdState,
                selectedRangeFacets: updatedSelectedFacets
            }
        };
    });
}

export default manageRangeFacets;
