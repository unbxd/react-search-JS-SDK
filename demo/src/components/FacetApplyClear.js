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

const FacetApplyClear = (props) => {
    const { handleClose } = props;
    const onApply = (textFacets, rangeFacets) => {
        console.log('Facets apply :', textFacets, rangeFacets);
        scrollTop();
        handleClose && handleClose();
        return true;
    };

    const onClear = (textFacets, rangeFacets) => {
        console.log('Facets clear :', textFacets, rangeFacets);
        scrollTop();
        handleClose && handleClose();
        return true;
    };

    return (
        <FacetActions
            applyFilterComponent={<ApplyFilter />}
            clearFilterComponent={<ClearFilter />}
            onApply={onApply}
            onClear={onClear}
        />
    );
};

export default FacetApplyClear;
