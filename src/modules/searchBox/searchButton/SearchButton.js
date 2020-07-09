import React from 'react';

import { SearchBoxContextConsumer } from '../context';
import { Button } from '../../../components';

const SearchButton = () => {

    return (<SearchBoxContextConsumer>
        {({ data, helpers }) => {

            const { SubmitComponent, onSearchBoxSubmit } = helpers;

            return (SubmitComponent ?
                <SubmitComponent onSearchBoxSubmit={onSearchBoxSubmit} /> : <Button type='submit' className='UNX-searchbox__button'>Search</Button>)
        }}
    </SearchBoxContextConsumer>)
}

export default SearchButton;
