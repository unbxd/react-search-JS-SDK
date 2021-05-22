import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import SearchBoxWrapper from './SearchBoxWrapper';
import { manageStateTypes, searchStatus, productTypes } from '../../config';

/**
 * Component to manage the search query.
 */
class SearchBoxContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
        this.onSearchBoxClear = this.onSearchBoxClear.bind(this);
        this.onSearchBoxSubmit = this.onSearchBoxSubmit.bind(this);
        this.setSearchBoxQuery = this.setSearchBoxQuery.bind(this);

        this.state = { query: '' };
    }

    componentDidMount() {
        const {
            helpers: { setSearchBoxConfiguration }
        } = this.props;
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
        this.setState({ query });
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
        const {
            helpers: { getAnalytics }
        } = this.props;
        const { trackSearch } = getAnalytics();
        const { query } = this.state;
        const {
            onSubmit,
            helpers: { resetSearch }
        } = this.props;
        const {
            helpers: {
                setSearchBoxConfiguration,
                manageTextFacets,
                manageRangeFacets
            }
        } = this.props;
        if (!query.replace(/\s/g, '').length) {
            return false;
        }
        const queryString = encodeURIComponent(query);
        // check for empty string
        // dont call search if the query is empty.

        if (onSubmit) {
            if (onSubmit(query) && query.length) {
                resetSearch();
                setSearchBoxConfiguration({ query: queryString });
                // track for search hit here
                trackSearch(query);
            }
        } else if (query.length) {
            resetSearch();
            setSearchBoxConfiguration({ query: queryString });
            // track for search hit here
            trackSearch(query);
        }
        manageTextFacets(null, null, null, manageStateTypes.RESET);
        manageRangeFacets(null, null, null, manageStateTypes.RESET);
    }

    componentDidUpdate(prevProps) {
        const {
            unbxdCore,
            unbxdCoreStatus,
            query,
            productType,
            defaultSearch
        } = this.props;
        const { q: currentQuery } = unbxdCore.getQueryParams();
        if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === searchStatus.LOADING &&
            typeof currentQuery === 'string' &&
            currentQuery.length > 0 &&
            prevProps.query === query &&
            productType === productTypes.SEARCH
        ) {
            this.setState({ query: currentQuery });
        }

        if (
            defaultSearch !== currentQuery &&
            typeof defaultSearch === 'string' &&
            unbxdCoreStatus !== searchStatus.LOADING &&
            defaultSearch.length > 0 &&
            currentQuery === undefined
        ) {
            const {
                helpers: { setSearchBoxConfiguration }
            } = this.props;
            this.setState({ query: defaultSearch });
            setSearchBoxConfiguration({ query: defaultSearch });
        }
    }

    getSearchBoxProps() {
        const {
            unbxdCore,
            unbxdCoreStatus,
            productType,
            autoFocus,
            clearable,
            showLoader,
            inputComponent,
            submitComponent,
            clearComponent,
            placeholder
        } = this.props;

        const lastSearchedQuery = unbxdCore.getSearchQuery() || '';

        const data = {
            unbxdCoreStatus,
            autoFocus,
            clearable,
            showLoader,
            lastSearchedQuery,
            placeholder,
            productType,
            ...this.state
        };

        const helpers = {
            onSearchBoxChange: this.onSearchBoxChange,
            onSearchBoxSubmit: this.onSearchBoxSubmit,
            onSearchBoxClear: this.onSearchBoxClear,
            setSearchBoxQuery: this.setSearchBoxQuery,
            inputComponent,
            submitComponent,
            clearComponent
        };

        return { ...data, ...helpers };
    }

    render() {
        const DefaultRender = SearchBoxWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getSearchBoxProps(),
            DefaultRender
        );
    }
}

SearchBoxContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    autoFocus: PropTypes.bool,
    clearable: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClear: PropTypes.func,
    showLoader: PropTypes.bool,
    inputComponent: PropTypes.element,
    submitComponent: PropTypes.element,
    clearComponent: PropTypes.element,
    defaultSearch: PropTypes.string,
    placeholder: PropTypes.string,
    productType: PropTypes.string
};

export default SearchBoxContainer;
