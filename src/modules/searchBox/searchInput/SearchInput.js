import React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from '../../../common/utils';
import RenderInput from './RenderInput';

const SearchInput = (props) => {
    const {
        query,
        lastSearchedQuery,
        placeholder,
        autoFocus,
        clearable,
        productType,
        onSearchBoxChange,
        onSearchBoxClear,
        setSearchBoxQuery,
        inputComponent,
        clearComponent
    } = props;

    const searchInputProps = {
        query,
        lastSearchedQuery,
        placeholder,
        autoFocus,
        clearable,
        productType,
        inputComponent,
        onSearchBoxChange,
        onSearchBoxClear,
        setSearchBoxQuery,
        clearComponent,
        className: 'UNX-searchbox__input'
    };

    return inputComponent ? (
        cloneElement(inputComponent, { ...searchInputProps })
    ) : (
        <RenderInput {...searchInputProps} />
    );
};

SearchInput.propTypes = {
    query: PropTypes.string.isRequired,
    lastSearchedQuery: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onSearchBoxChange: PropTypes.func.isRequired,
    onSearchBoxClear: PropTypes.func.isRequired,
    setSearchBoxQuery: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    clearable: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClear: PropTypes.func,
    showLoader: PropTypes.bool,
    inputComponent: PropTypes.element,
    submitComponent: PropTypes.element,
    clearComponent: PropTypes.element,
    defaultSearch: PropTypes.string,
    productType: PropTypes.string
};

export default SearchInput;
