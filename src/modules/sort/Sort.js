import React from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../common/context';
import { SortContextProvider } from './context'
import SortBy from './sortBy';
import ResetSort from './resetSort';
import { conditionalRenderer, hasUnbxdSearchWrapperContext } from '../../common/utils';
import { getFormattedSort, getSelectedSort } from './utils';


/**
 * Component to sort the products. 
 */
class Sort extends React.Component {

    constructor(props) {
        super(props);

        //we will maintain the sort field here
        const { defaultSort } = this.props;
        if (defaultSort.field && defaultSort.order) {

            const formattedSortBy = getFormattedSort(defaultSort);
            this.state = {
                sortBy: formattedSortBy,
            }
        } else {
            this.state = {
                sortBy: '',
            }
        }

    }

    componentDidMount() {

        if (this.context === undefined) {
            hasUnbxdSearchWrapperContext(Sort.displayName);
        }

        const { helpers: { setSortConfiguration } } = this.context;

        const { defaultSort: sortBy, } = this.props;

        //Set the main config
        const { field = '', order = '' } = sortBy;
        if (field.length && order.length) {
            setSortConfiguration({
                sortBy: `${sortBy.field} ${sortBy.order}`
            });
        }
    }

    getSortProps() {

        const { unbxdCore, helpers: { setSortConfiguration, trackActions } } = this.context;
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);

        const { noOfPages = 0, } = getPaginationInfo() || {};

        const { sortOptions, sortDisplayType, SortItemComponent, reset } = this.props;

        //format datas for better handling.
        const formattedSortByOptions =
            sortOptions.map(sortByoption => (getFormattedSort(sortByoption)));


        const onSortClick = (event) => {

            const newSortBy = event.target.dataset.unxsortby || event.target.value;
            const selectedSort = getSelectedSort(newSortBy, formattedSortByOptions);

            trackActions({ type: 'SORT_CLICK', data: { sort: selectedSort } });
            const { field = '', order = '' } = selectedSort;

            if (field.length && order.length) {

                this.setState({ sortBy: selectedSort })
                //we pass `price desc` format to set Configuration
                setSortConfiguration({
                    sortBy: `${field} ${order}`
                }, true);

            } else {

                onSortResetClick();
            }

        }

        const onSortResetClick = () => {

            trackActions({ type: 'SORT_RESET', data: {} });
            const resetSortBy = formattedSortByOptions.length ? formattedSortByOptions[0] : '';
            this.setState({ sortBy: resetSortBy });
            setSortConfiguration({
                sortBy: ''
            }, true);
        }

        const data = {
            sortOptions: formattedSortByOptions,
            sortDisplayType,
            noOfPages,
            reset,
            ...this.state
        };
        const helpers = {
            SortItemComponent,
            onSortClick,
            onSortResetClick
        };
        return { data, helpers }
    }

    render() {

        const DefaultRender = <React.Fragment>
            <SortBy />
            <ResetSort />
        </React.Fragment>

        return (<SortContextProvider value={this.getSortProps()}>
            {conditionalRenderer(this.props.children, this.getSortProps(), DefaultRender)}
        </SortContextProvider>)
    }
}

Sort.contextType = AppContext;
Sort.SortBy = SortBy;
Sort.ResetSort = ResetSort;
Sort.displayName = "Sort";

Sort.defaultProps = {
    defaultSort: {
        "label": "Most relevant"
    },
    sortOptions: [],
    sortDisplayType: "DROPDOWN",
    reset: false
}

Sort.propTypes = {
    /**
    * Default sort to be applied on products. 
    */
    defaultSort: PropTypes.shape({
        "label": PropTypes.string,
        "field": PropTypes.string,
        "order": PropTypes.string,
    }),
    /**
    * Sort options to be applied on products. 
    */
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            "label": PropTypes.string,
            "field": PropTypes.string,
            "order": PropTypes.string,
        }))
        .isRequired,
    /**
    * Display type of `DROPDOWN` or `LIST` for Sort. 
    */
    sortDisplayType: PropTypes.string,
    /**
    * Custom LIST item component for Sort. 
    */
    SortItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Display sort reset option. 
    */
    reset: PropTypes.bool
}

export default Sort;
