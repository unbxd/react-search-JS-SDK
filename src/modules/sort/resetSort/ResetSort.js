import React from 'react';

import { SortContextConsumer } from '../context';
import { Button } from '../../../components/index';

const ResetSort = () => {
    return (<SortContextConsumer>
        {({ data, helpers }) => {
            
            const { sortBy, noOfPages } = data;
            const { onSortResetClick } = helpers;

            if (Object.keys(sortBy).length === 0) {
                return null;
            }

            if (noOfPages === 0) {
                return null;
            }

            return (<Button onClick={onSortResetClick} >Reset Sort</Button>)

        }}
    </SortContextConsumer>)
}

export default ResetSort;
