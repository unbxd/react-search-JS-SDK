import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../../../components';

class RenderInput extends React.Component {


    render() {
        const { query, onQueryChange, autoFocus, clearable, onClearQuery } = this.props;

        return (<Input
            value={query}
            onChange={onQueryChange}
            className='UNX-searchbox query'
            autoFocus={autoFocus}
            clearable={clearable}
            onClear={onClearQuery}
        />)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.queryAPI !== this.props.queryAPI && this.props.query !== this.props.queryAPI) {
            this.props.setSearchQuery(this.props.queryAPI);
        }
    }
}

export default RenderInput;
