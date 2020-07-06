import React from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../common/context'
import { SearchBoxContextProvider } from './context'
import SearchInput from './searchInput';
import SearchButton from './searchButton';
import { conditionalRenderer, hasUnbxdSearchWrapperContext } from '../../common/utils';
import { Loader as defaultLoader } from '../../components';
import { trackSearch } from '../analytics';

/**
 * Component to set or update the search query.
 */
class SearchBox extends React.Component {

    constructor(props) {
        super(props);

        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
        this.onSearchBoxClear = this.onSearchBoxClear.bind(this);
        this.onSearchBoxSubmit = this.onSearchBoxSubmit.bind(this);
        this.setSearchBoxQuery = this.setSearchBoxQuery.bind(this);

        this.state = { query: '' };
    }

    componentDidMount() {

        if (this.context === undefined) {
            hasUnbxdSearchWrapperContext(SearchBox.displayName);
        }

        const { helpers: { setSearchBoxConfiguration } } = this.context;
        const { defaultSearch = '' } = this.props;
        if (typeof defaultSearch === 'string' && defaultSearch.length) {
            setSearchBoxConfiguration({ query: defaultSearch });
        }
    }

    onSearchBoxChange(event) {
        const query = event.target.value;
        this.setState({ query });
    }

    setSearchBoxQuery(query) {
        this.setState({ query })
    }

    onSearchBoxClear() {

        const { query } = this.state;
        const { onClear } = this.props;

        if (onClear) {
            onClear(query) && this.setState({ query: '' });
        } else {
            this.setState({ query: '' });
        }
    }

    onSearchBoxSubmit(event) {
        event.preventDefault();

        const { query } = this.state;
        const { onSubmit } = this.props;
        const { helpers: { setSearchBoxConfiguration } } = this.context;

        if (onSubmit) {

            if (onSubmit(query) && query.length) {

                setSearchBoxConfiguration({ query });
                //track for search hit here
                trackSearch(query);
            }
        }
        else {

            if (query.length) {

                setSearchBoxConfiguration({ query });
                //track for search hit here
                trackSearch(query);
            }
        }
    }

    getSearchBoxProps() {

        const { unbxdCoreStatus, productType } = this.context;
        const {
            autoFocus,
            clearable,
            showLoader,
            InputComponent,
            SubmitComponent,
            ClearComponent } = this.props;

        const { unbxdCore } = this.context;
        const lastSearchedQuery = unbxdCore.getSearchQuery() || "";

        const data = {
            unbxdCoreStatus,
            autoFocus,
            clearable,
            showLoader,
            lastSearchedQuery,
            productType,
            ...this.state,
        };

        const helpers = {
            onSearchBoxChange: this.onSearchBoxChange,
            onSearchBoxSubmit: this.onSearchBoxSubmit,
            onSearchBoxClear: this.onSearchBoxClear,
            setSearchBoxQuery: this.setSearchBoxQuery,
            InputComponent,
            SubmitComponent,
            ClearComponent
        };

        return { data, helpers };
    }

    render() {

        const { LoaderComponent } = this.props;

        const DefaultRender = <form onSubmit={this.onSearchBoxSubmit} className='UNX-searchbox-container'>
            <SearchInput />
            <SearchButton />
        </form>;
        const LoaderRender = <LoaderComponent />;

        return (<SearchBoxContextProvider value={this.getSearchBoxProps()}>
            {conditionalRenderer(this.props.children, this.getSearchBoxProps(), DefaultRender, LoaderRender)}
        </SearchBoxContextProvider>)
    }
}

SearchBox.contextType = AppContext;
SearchBox.SearchInput = SearchInput;
SearchBox.SearchButton = SearchButton;
SearchBox.displayName = "SearchBox";

SearchBox.defaultProps = {
    autoFocus: false,
    clearable: false,
    onSubmit: null,
    onClear: null,
    LoaderComponent: defaultLoader,
    showLoader: false
}

SearchBox.propTypes = {
    /**
    * Should the searchbox be focused by default.
    */
    autoFocus: PropTypes.bool,
    /**
    * Should the searchbox be clearable.
    */
    clearable: PropTypes.bool,
    /**
    * Hook for search query. The function should return `true` if the search is to be triggered, false otherwise.
    */
    onSubmit: PropTypes.func,
    /**
    * Hook for clearing the search query. The function should return `true` if the searchbox is to be cleared, false otherwise.
    */
    onClear: PropTypes.func,
    /**
    * Custom loader component
    */
    LoaderComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Should loader be shown
    */
    showLoader: PropTypes.bool,
    /**
    * Custom input component
    */
    InputComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Custom submit component
    */
    SubmitComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Custom reset component
    */
    ClearComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Default search query
    */
    defaultSearch: PropTypes.string,

}

export default SearchBox;
