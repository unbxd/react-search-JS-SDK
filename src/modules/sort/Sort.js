import React from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../common/context';
import { SortContextProvider } from './context'
import SortBy from './sortBy';
import ResetSort from './resetSort';
import { conditionalRenderer } from '../../common/utils';
import { getFormattedSort, getSelectedSort } from './utils';

class Sort extends React.Component {

    static contextType = AppContext;
    static SortBy = SortBy;
    static ResetSort = ResetSort;

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

        const { sortOptions, sortDisplayType, SortItemComponent } = this.props;

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

        //Dont render anything if we don't get defaultSort or sortOptions
        return (<SortContextProvider value={this.getSortProps()}>
            {conditionalRenderer(this.props.children, this.getSortProps(), DefaultRender)}
        </SortContextProvider>)
    }
}

Sort.defaultProps = {
    defaultSort: {
        "label": "Most relevant"
    },
    sortOptions: []
}

Sort.propTypes = {
    defaultSort: PropTypes.shape({
        "label": PropTypes.string,
        "field": PropTypes.string,
        "order": PropTypes.string,
    }),
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            "label": PropTypes.string,
            "field": PropTypes.string,
            "order": PropTypes.string,
        }))
        .isRequired,
    sortDisplayType: PropTypes.string.isRequired,
    SortItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default Sort;
