import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../../../components';

class RenderInput extends React.Component {

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
            className='UNX-searchbox query'
            autoFocus={autoFocus}
            clearable={clearable}
            onClear={onSearchBoxClear}
            ClearComponent={ClearComponent}
        />)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lastSearchedQuery !== this.props.lastSearchedQuery &&
            this.props.query !== this.props.lastSearchedQuery) {

            this.props.setSearchBoxQuery(this.props.lastSearchedQuery);
        }
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
