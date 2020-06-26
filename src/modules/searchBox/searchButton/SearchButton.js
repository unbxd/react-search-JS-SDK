import React from 'react';

import { SearchBoxContextConsumer } from '../context';
import { Button } from '../../../components';

const SearchButton = () => {

    return (<SearchBoxContextConsumer>
        {() => {

            return (<Button type='submit' className='UNX-searchbox submit'>Search</Button>)
        }}
    </SearchBoxContextConsumer>)
}

export default SearchButton;
