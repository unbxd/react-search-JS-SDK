import React from 'react';
import PropTypes from 'prop-types';

import RenderInput from './RenderInput';

const SearchInput = props => {
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
    InputComponent,
    ClearComponent
  } = props;

  const searchInputProps = {
    query,
    lastSearchedQuery,
    placeholder,
    autoFocus,
    clearable,
    productType,
    InputComponent,
    onSearchBoxChange,
    onSearchBoxClear,
    setSearchBoxQuery,
    ClearComponent,
    className: 'UNX-searchbox__input'
  };

  return InputComponent ? (
    <InputComponent {...searchInputProps} />
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
  InputComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  SubmitComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  ClearComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  defaultSearch: PropTypes.string,
  productType: PropTypes.string
};

export default SearchInput;
