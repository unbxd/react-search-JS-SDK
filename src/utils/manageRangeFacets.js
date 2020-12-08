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
        const { selectedRangeFacets } = unbxdState;
        const { add, remove } = selectedRangeFacets;
        const { unbxdCore } = this.state;
        const { lastSelectedRangeFacets } = getRangeFacetCoreMethods(unbxdCore);
        const formattedLastSelectedRangeFacets = getSelectedRangeFacets(
            lastSelectedRangeFacets
        );
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
                }
                break;

            case manageStateTypes.APPLY: {
                updatedSelectedFacets = {
                    add: {},
                    remove: {}
                };

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
                    remove: { ...remainingStateRemove }
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

        const list = mergeFacets(
            updatedSelectedFacets,
            formattedLastSelectedRangeFacets
        );

        updatedSelectedFacets = { ...updatedSelectedFacets, list };

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
