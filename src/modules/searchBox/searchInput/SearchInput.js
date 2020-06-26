import React from 'react';

import { SearchBoxContextConsumer } from '../context';
import RenderInput from './RenderInput';

const SearchInput = () => {
    return (<SearchBoxContextConsumer>
        {({ data, helpers }) => {

            const { query, queryAPI, isAutoFocus, isClear } = data;
            const { onQueryChange, onClearQuery, setSearchQuery } = helpers;

            return (<RenderInput
                query={query}
                queryAPI={queryAPI}
                onQueryChange={onQueryChange}
                className='UNX-searchbox query'
                isAutoFocus={isAutoFocus}
                isClear={isClear}
                onClearQuery={onClearQuery}
                setSearchQuery={setSearchQuery}
            />)
        }}
    </SearchBoxContextConsumer>)

}

export default SearchInput;
