import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { SearchBox } from '../../../src/index';
import { useHistory } from 'react-router-dom';
import { ProductTypeContext } from '../context';
import CategoryLinks from './CategoryLinks';
import MobileMenu from './MobileMenu';
import { categoryLinks } from '../config';

export const SearchButton = ({ onSearchBoxSubmit }) => {
    return (
        <button
            onClick={onSearchBoxSubmit}
            className="UNX-searchbox__button"
            aria-label="Search"
        />
    );
};

export const InputComponent = ({
    query,
    onSearchBoxChange,
    onSearchBoxClear
}) => {
    return (
        <input
            className="UNX-searchbox__input"
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
    const {
        onProductTypeChange,
        productType,
        handleShow,
        refreshId,
        setRefreshId
    } = props;
    const [categoryPathLinks, setCategoryPathLinks] = useState(categoryLinks);
    const { enableFilters, setEnableFilters } = useContext(ProductTypeContext);
    const history = useHistory();
    const handleSubmit = () => {
        if (productType !== 'SEARCH') {
            onProductTypeChange('SEARCH');
            history.push('/');
        }
        if (!enableFilters) {
            setEnableFilters(true);
        }
        return true;
    };

    const handleCategoryLinkClick = (event) => {
        const path = event.target.dataset['unx_path'];
        let currentCategoryItem = null;
        const updatedPathLinks = categoryPathLinks.map((links) => {
            if (links.path === path) {
                currentCategoryItem = links;
                return { ...links, isSelected: true };
            }
            return { ...links, isSelected: false };
        });
        setCategoryPathLinks(updatedPathLinks);
        window.UnbxdAnalyticsConf = {};
        window.UnbxdAnalyticsConf['page'] = "itemGroupIds:1800"
        // window.UnbxdAnalyticsConf['page'] = currentCategoryItem.path;
        window.UnbxdAnalyticsConf['page_type'] = 'BOOLEAN';
        onProductTypeChange('CATEGORY');
        setRefreshId(refreshId + 1);
    };

    const languageOptions = [
        { value: 'english', label: 'English' },
        { value: 'french', label: 'French' },
        { value: 'german', label: 'German' }
    ];

    return (
        <div className="UNX-header__container">
            <a href="/" aria-label="Unbxd">
                <span className="UNX-header__logo" />
            </a>
            <CategoryLinks
                categoryPathLinks={categoryPathLinks}
                handleCategoryLinkClick={handleCategoryLinkClick}
                setProductType={onProductTypeChange}
            />
            <MobileMenu
                categoryPathLinks={categoryPathLinks}
                handleCategoryLinkClick={handleCategoryLinkClick}
                handleShow={handleShow}
                enableFilters={enableFilters}
            />
            <div className="UNX-header__search">
                <SearchBox
                    inputComponent={<InputComponent />}
                    submitComponent={<SearchButton />}
                    placeholder="Search Demo"
                    onSubmit={handleSubmit}
                />
                <Select
                    defaultValue={languageOptions[0]}
                    options={languageOptions}
                    className="UNX-language__dropdown UNX-dropdown-container"
                    classNamePrefix="UNX-dropdown"
                    aria-label="language options"
                />
                <i className="UNX-cart__icon fa fa-shopping-bag fa-2x" />
            </div>
        </div>
    );
};

export default SearchBar;
