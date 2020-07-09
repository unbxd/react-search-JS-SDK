import React from 'react';

import { SearchBox } from '@unbxd-ui/react-search-sdk';

const defaultSearch = 'rde shirt';
const SearchButton = ({ onSearchBoxSubmit }) => {
    return (<button onClick={onSearchBoxSubmit} className={'UNX-searchbox__button'}></button>)
}

const SearchBar = () => {
    return (
        <div className="UNX-header__container">
            <a href="/" className="UNX-header__logo"></a>
            <div className="UNX-header__search">
                <SearchBox
                    defaultSearch={defaultSearch}
                    SubmitComponent={SearchButton} />
            </div>
        </div>

    )
}

export default SearchBar;
