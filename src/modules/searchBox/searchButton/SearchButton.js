import React from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from '../../../common/utils';

import { Button } from '../../../components';

const SearchButton = (props) => {
    const { submitComponent, onSearchBoxSubmit } = props;

    return submitComponent ? (
        cloneElement(submitComponent, { onSearchBoxSubmit })
    ) : (
        <Button
            type="submit"
            className="UNX-searchbox__button"
            aria-label="search"
        >
            Search
        </Button>
    );
};

SearchButton.propTypes = {
    submitComponent: PropTypes.element,
    onSearchBoxSubmit: PropTypes.func.isRequired
};

export default SearchButton;
