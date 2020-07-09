import React from 'react';

import { SortContextConsumer } from '../context';
import { Button } from '../../../components/index';

const ResetSort = () => {

    return (<SortContextConsumer>
        {({ data, helpers }) => {

            const { sortBy, noOfPages, reset } = data;
            const { onSortResetClick } = helpers;

            if (!reset) {
                return false;
            }

            if (Object.keys(sortBy).length === 0) {
                return null;
            }

            const [title, order] = sortBy['value'].split("|");
            if (title === order && order === 'undefined') {
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
