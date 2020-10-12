import React from 'react';

import { SearchBox } from '@unbxd-ui/react-search-sdk';
import { useHistory } from 'react-router-dom';

const SearchButton = ({ onSearchBoxSubmit }) => {
    return (
        <button
            onClick={onSearchBoxSubmit}
            className={'UNX-searchbox__button'}
        ></button>
    );
};

const SearchBar = (props) => {
    const { onSearch, productType } = props;
    const history = useHistory();
    const handleSubmit = () => {
        if (productType !== 'SEARCH') {
            onSearch('SEARCH');
        }
        history.push('/');
        return true;
    };
    return (
        <div className="UNX-header__container">
            <a href="/" className="UNX-header__logo"></a>
            <div className="UNX-header__search">
                <SearchBox
                    SubmitComponent={SearchButton}
                    placeholder={'Search Wildearth'}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default SearchBar;
