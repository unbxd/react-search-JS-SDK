import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../../../components';
import { productTypes } from '../../../config';

class RenderInput extends React.Component {

    componentDidUpdate(prevProps) {

        if (prevProps.lastSearchedQuery !== this.props.lastSearchedQuery &&
            this.props.query !== this.props.lastSearchedQuery) {

            if (this.props.productType === productTypes.CATEGORY) {

                this.props.setSearchBoxQuery("");
            } else {

                this.props.setSearchBoxQuery(this.props.lastSearchedQuery);
            }
        }
    }

    render() {

        const { query,
            onSearchBoxChange,
            autoFocus,
            clearable,
            onSearchBoxClear,
            ClearComponent } = this.props;

        return (<Input
            value={query}
            onChange={onSearchBoxChange}
            className='UNX-searchbox__input'
            autoFocus={autoFocus}
            clearable={clearable}
            onClear={onSearchBoxClear}
            ClearComponent={ClearComponent}
        />)
    }


}

RenderInput.props = {
    query: PropTypes.string.isRequired,
    onSearchBoxChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    clearable: PropTypes.bool,
    setSearchBoxQuery: PropTypes.func.isRequired,
    onSearchBoxClear: PropTypes.func.isRequired,
    ClearComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default RenderInput;
