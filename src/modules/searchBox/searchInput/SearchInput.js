import React from 'react';

import { SearchBoxContextConsumer } from '../context';
import RenderInput from './RenderInput';

const SearchInput = () => {
    return (<SearchBoxContextConsumer>
        {({ data, helpers }) => {

            const { query,
                lastSearchedQuery,
                autoFocus,
                clearable } = data;

            const { onSearchBoxChange,
                onSearchBoxClear,
                setSearchBoxQuery,
                InputComponent,
                ClearComponent } = helpers;

            const searchInputProps = {
                query,
                lastSearchedQuery,
                autoFocus,
                clearable,
                InputComponent,
                onSearchBoxChange,
                onSearchBoxClear,
                setSearchBoxQuery,
                ClearComponent,
                className: 'UNX-searchbox query'
            }

            return (InputComponent ?
                <InputComponent {...searchInputProps} /> : <RenderInput {...searchInputProps} />)
        }}
    </SearchBoxContextConsumer>)

}

export default SearchInput;
