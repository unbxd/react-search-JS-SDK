import { mergeFacets } from '../common/utils';
import { manageStateTypes } from '../config';
import { getTextFacetFacetCoreMethods } from '../modules/textFacets/utils';

function manageTextFacets(
    currentFacet = {},
    selectedFacetName = '',
    selectedFacetId = 0,
    action
) {
    this.setState((appState) => {
        const { unbxdState, ...remaningState } = appState;
        const { selectedTextFacets } = unbxdState;
        const { add, remove } = selectedTextFacets;
        const { unbxdCore } = this.state;
        const { getSelectedFacets } = getTextFacetFacetCoreMethods(unbxdCore);
        const lastSelectedTextFacets = getSelectedFacets();
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
                        (fValue) => fValue.dataId !== selectedFacetId
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
                        lastSelectedTextFacets
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
                        (fValue) => fValue.dataId !== selectedFacetId
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
                        lastSelectedTextFacets
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
                    lastSelectedTextFacets
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
                    lastSelectedTextFacets
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
                selectedTextFacets: updatedSelectedFacets
            }
        };
    });
}

export default manageTextFacets;
