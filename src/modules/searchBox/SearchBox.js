import React from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../common/context'
import { SearchBoxContextProvider } from './context'
import SearchInput from './searchInput';
import SearchButton from './searchButton';
import { conditionalRenderer, isContext } from '../../common/utils';

/**
 * Component to set or update the search query.
 */
class SearchBox extends React.Component {

    constructor(props) {
        super(props);

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onClearQuery = this.onClearQuery.bind(this);
        this.handleQuerySubmit = this.handleQuerySubmit.bind(this);

        this.state = { query: '' };
    }


    onQueryChange(event) {
        const query = event.target.value;
        this.setState({ query });
    }

    onClearQuery() {

        const { query } = this.state;
        const { onClear } = this.props;

        if (onClear) {
            onClear(query) && this.setState({ query: '' });
        } else {
            this.setState({ query: '' });
        }
    }

    handleQuerySubmit(event) {
        event.preventDefault();

        const { query } = this.state;
        const { onSubmit } = this.props;
        const { helpers: { setSearchBoxConfiguration, trackActions } } = this.context;

        if (onSubmit) {

            if (onSubmit(query) && query.length) {

                setSearchBoxConfiguration({ query });
                //track for search hit here
                trackActions({ type: 'SEARCH', data: { query } })
            }
        }
        else {

            if (query.length) {

                setSearchBoxConfiguration({ query });
                //track for search hit here
                trackActions({ type: 'SEARCH', data: { query } })
            }
        }


    }

    componentDidMount() {

        if (this.context === undefined) {
            isContext(Products.displayName);
        }
    }

    getSearchBoxProps() {

        const {
            isAutoFocus,
            isClear, } = this.props;

        const data = {
            isAutoFocus,
            isClear,
            ...this.state
        };
        const helpers = {
            onQueryChange: this.onQueryChange,
            handleQuerySubmit: this.handleQuerySubmit,
            onClearQuery: this.onClearQuery,

        };

        return { data, helpers };
    }


    render() {

        const DefaultRender = <form onSubmit={this.handleQuerySubmit} className='UNX-searchbox-container'>
            <SearchInput />
            <SearchButton />
        </form>

        return (<SearchBoxContextProvider value={this.getSearchBoxProps()}>
            {conditionalRenderer(this.props.children, this.getSearchBoxProps(), DefaultRender)}
        </SearchBoxContextProvider>)
    }
}

SearchBox.contextType = AppContext;

SearchBox.SearchInput = SearchInput;
SearchBox.SearchButton = SearchButton;

SearchBox.displayName = "SearchBox";

SearchBox.defaultProps = {
    isAutoFocus: false,
    isClear: false,
    onSubmit: null,
    onClear: null,
}

SearchBox.propTypes = {
    /**
    * Should the searchbox be focused by default.
    */
    isAutoFocus: PropTypes.bool,
    /**
    * Should the searchbox be clearable.
    */
    isClear: PropTypes.bool,
    /**
    * Hook for search query. The function should return `true` if the search is to be triggered, false otherwise.
    */
    onSubmit: PropTypes.func,
    /**
    * Hook for clearing the search query. The function should return `true` if the searchbox is to be cleared, false otherwise.
    */
    onClear: PropTypes.func,
}

export default SearchBox;
