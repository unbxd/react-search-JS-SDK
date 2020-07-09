import React from 'react';

import { Facets } from '@unbxd-ui/react-search-sdk';

const categoryDisplayName = 'category';
const categoryField = 'categoryPath';

const Filters = () => {
    return (<Facets
        categoryDisplayName={categoryDisplayName}
        categoryField={categoryField} />)
}

export default Filters;
