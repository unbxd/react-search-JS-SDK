import React from "react";

import { FacetActions } from "@unbxd-ui/react-search-sdk";

const ApplyFilter = ({ onApplyFilter }) => (
  <button className='-apply' onClick={onApplyFilter}>Apply</button>
);
const ClearFilter = ({ onClearFilter }) => (
  <button className='-clear' onClick={onClearFilter}>Clear</button>
);

const FacetApplyClear = () => (
  <FacetActions
    ApplyFilterComponent={ApplyFilter}
    ClearFilterComponent={ClearFilter}
  />
);

export default FacetApplyClear;
