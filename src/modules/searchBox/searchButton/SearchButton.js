import React from 'react';
import PropTypes from 'prop-types';


import { Button } from '../../../components';

const SearchButton = props => {
  const { SubmitComponent, onSearchBoxSubmit } = props;

  return SubmitComponent ? (
    <SubmitComponent onSearchBoxSubmit={onSearchBoxSubmit} />
  ) : (
    <Button type="submit" className="UNX-searchbox__button">
      Search
    </Button>
  );
};

SearchButton.propTypes = {
  SubmitComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onSearchBoxSubmit: PropTypes.func.isRequired
};

export default SearchButton;
