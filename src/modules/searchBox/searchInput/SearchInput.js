import React from 'react';

import { SearchBoxContextConsumer } from '../context';
import { Input } from '../../../components';

const SearchInput = () => {
    return (<SearchBoxContextConsumer>
        {({ data, helpers }) => {

            const { query, isAutoFocus, isClear } = data;
            const { onQueryChange, onClearQuery } = helpers;

            return (<Input
                value={query}
                onChange={onQueryChange}
                className='UNX-searchbox query'
                isAutoFocus={isAutoFocus}
                isClear={isClear}
                onClear={onClearQuery}
            />)
        }}
    </SearchBoxContextConsumer>)

}

export default SearchInput;
