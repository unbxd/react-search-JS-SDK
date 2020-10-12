import React from 'react';

import { FacetActions } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

const ApplyFilter = ({ onApplyFilter }) => (
    <button className="-apply" onClick={onApplyFilter}>
        Apply
    </button>
);
const ClearFilter = ({ onClearFilter }) => (
    <button className="-clear" onClick={onClearFilter}>
        Clear
    </button>
);

const onApply = (facets) => {
    console.log('Facets apply :', facets);
    scrollTop();
    return true;
};

const onClear = () => {
    console.log('Facets clear :');
    scrollTop();
    return true;
};

const FacetApplyClear = () => (
    <FacetActions
        ApplyFilterComponent={ApplyFilter}
        ClearFilterComponent={ClearFilter}
        //onApply={onApply}
        //onClear={onClear}
    />
);

export default FacetApplyClear;
