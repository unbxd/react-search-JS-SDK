import React from 'react';

import { SearchBox } from '@unbxd-ui/react-search-sdk';

const SearchButton = ({ onSearchBoxSubmit }) => {
    return (<button onClick={onSearchBoxSubmit} className={'UNX-searchbox__button'}></button>)
}

const SearchBar = () => {
    return (
        <div className="UNX-header__container">
            <a href="/" className="UNX-header__logo"></a>
            <div className="UNX-header__search">
                <SearchBox
                    SubmitComponent={SearchButton}
                    placeholder={'Search Wildearth'} />
            </div>
        </div>

    )
}

export default SearchBar;
