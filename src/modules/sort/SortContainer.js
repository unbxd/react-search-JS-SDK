import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer, executeCallback } from '../../common/utils';
import { getFormattedSort, getSelectedSort } from './utils';
import SortWrapper from './SortWrapper';
import { searchStatus } from '../../config';

class SortContainer extends React.Component {
    constructor(props) {
        super(props);

        // we will maintain the sort field here
        const { unbxdCore } = this.props;

        if (unbxdCore.state.responseObj !== null) {
            const sortStr = unbxdCore.state.selectedSort;
            const [field, order] = sortStr.split(' ');
            const formattedSortBy = getFormattedSort({ field, order });
            this.state = {
                sortBy: formattedSortBy
            };
        } else {
            this.state = {
                sortBy: { value: '' }
            };
        }
    }

    componentDidMount() {
        const {
            helpers: { setSortConfiguration },
            unbxdCore,
            sortOptions
        } = this.props;

        let sortOn = null;
        const { sort = '' } = unbxdCore.getQueryParams();
        const decodedSort = sort ? decodeURI(sort) : '';
        if (typeof decodedSort === 'string' && decodedSort.length) {
            const [field, order] = decodedSort.split(' ');
            sortOn = { field, order };
            const formattedSort = `${field}|${order}`;
            const formattedSortByOptions = sortOptions.map((sortByoption) =>
                getFormattedSort(sortByoption, this.state.sortBy)
            );
            const selectedSort = getSelectedSort(
                formattedSort,
                formattedSortByOptions
            );
            if (field.length && order.length) {
                this.setState({ sortBy: selectedSort });
            }
        } else {
            sortOn = '';
        }

        if (unbxdCore.state.responseObj === null) {
            const { field = '', order = '' } = sortOn;
            if (field.length && order.length) {
                setSortConfiguration({
                    sortBy: `${sortOn.field} ${sortOn.order}`
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        const {
            unbxdCore,
            unbxdCoreStatus,
            sort: sortState,
            sortOptions,
            helpers: { setSortConfiguration }
        } = this.props;

        const { sort } = unbxdCore.getQueryParams();
        const decodedSort = sort ? decodeURI(sort) : '';

        if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === searchStatus.LOADING &&
            sortState !== decodedSort &&
            prevProps.sort === sortState
        ) {
            if (decodedSort === undefined) {
                this.setState({ sortBy: { value: '' } });
                setSortConfiguration({
                    sortBy: ``
                });
            } else {
                const [field, order] = decodedSort.split(' ');
                const formattedSort = `${field}|${order}`;
                const formattedSortByOptions = sortOptions.map((sortByoption) =>
                    getFormattedSort(sortByoption, this.state.sortBy)
                );
                const selectedSort = getSelectedSort(
                    formattedSort,
                    formattedSortByOptions
                );
                if (field.length && order.length) {
                    this.setState({ sortBy: selectedSort });
                }
            }
        }

        if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === searchStatus.LOADING &&
            sortState !== sort &&
            sortState === ''
        ) {
            // there has been a reset
            this.setState({ sortBy: { value: '' } });
            setSortConfiguration({
                sortBy: ``
            });
        }
    }

    getSortProps() {
        const {
            unbxdCore,
            label,
            onSortChange,
            helpers: { setSortConfiguration }
        } = this.props;
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);

        const { noOfPages = 0 } = getPaginationInfo() || {};

        const { sortOptions = [], displayType, sortItemComponent } = this.props;

        // format datas for better handling.
        const formattedSortByOptions = sortOptions.map((sortByoption, idx) =>
            getFormattedSort(sortByoption, this.state.sortBy, idx)
        );

        const handleSortClick = (sortOption) => {
            let newSortBy = null;
            if (sortOption.target) {
                newSortBy = sortOption.target.value;
            } else {
                newSortBy = sortOption.value;
            }
            const selectedSort = getSelectedSort(
                newSortBy,
                formattedSortByOptions
            );

            const { field = '', order = '' } = selectedSort;

            if (field.length && order.length) {
                // we pass `price desc` format to set Configuration

                const onFinish = () => {
                    this.setState({ sortBy: selectedSort });
                    setSortConfiguration(
                        {
                            sortBy: `${field} ${order}`
                        },
                        true
                    );
                };

                executeCallback(onSortChange, [field, order], onFinish);
            } else {
                onSortResetClick();
            }
        };

        const onSortResetClick = () => {
            const resetSortBy = formattedSortByOptions.length
                ? formattedSortByOptions[0]
                : { value: '' };
            this.setState({ sortBy: resetSortBy });
            setSortConfiguration(
                {
                    sortBy: ''
                },
                true
            );
        };

        const data = {
            sortOptions: formattedSortByOptions,
            displayType,
            noOfPages,
            ...this.state
        };
        const helpers = {
            sortItemComponent,
            onSortClick: handleSortClick,
            onSortResetClick,
            label
        };
        return { ...data, ...helpers };
    }

    render() {
        const DefaultRender = SortWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getSortProps(),
            DefaultRender
        );
    }
}

SortContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            order: PropTypes.string
        })
    ).isRequired,
    displayType: PropTypes.string,
    sortItemComponent: PropTypes.element,
    label: PropTypes.node,
    onSortChange: PropTypes.func
};

export default SortContainer;
