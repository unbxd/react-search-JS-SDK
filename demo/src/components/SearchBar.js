import React, { useContext } from 'react';

import { SearchBox } from '@unbxd-ui/react-search-sdk';
import { useHistory } from 'react-router-dom';
import { ProductTypeContext } from '../context';

export const SearchButton = ({ onSearchBoxSubmit }) => {
    return (
        <button onClick={onSearchBoxSubmit} className="UNX-searchbox__button" />
    );
};

export const InputComponent = ({
    query,
    onSearchBoxChange,
    onSearchBoxClear
}) => {
    return (
        <input
            value={query}
            onChange={onSearchBoxChange}
            onClear={onSearchBoxClear}
        />
    );
};
export const SubmitComponent = ({ onSearchBoxSubmit }) => {
    return <div onClick={onSearchBoxSubmit}> Submit</div>;
};
export const ClearComponent = ({ onSearchBoxClear }) => {
    return <div onClick={onSearchBoxClear}> x </div>;
};

const SearchBar = (props) => {
    const { onSearch, productType } = props;
    const { enableFilters, setEnableFilters } = useContext(ProductTypeContext);
    const history = useHistory();
    const handleSubmit = () => {
        if (productType !== 'SEARCH') {
            onSearch('SEARCH');
            history.push('/');
        }
        if (!enableFilters) {
            setEnableFilters(true);
        }
        return true;
    };
    return (
        <div className="UNX-header__container">
            <a href="/">
                <span className="UNX-header__logo" />
            </a>
            <div className="UNX-header__search">
                <SearchBox
                    submitComponent={<SearchButton />}
                    placeholder="Search Demo"
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default SearchBar;
