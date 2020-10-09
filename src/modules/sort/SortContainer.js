import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getFormattedSort, getSelectedSort } from './utils';
import SortWrapper from './SortWrapper';

class SortContainer extends React.Component {
    constructor(props) {
        super(props);

        //we will maintain the sort field here
        const { unbxdCore, defaultSort } = this.props;

        if (unbxdCore.state.responseObj !== null) {
            const sortStr = unbxdCore.state.selectedSort;
            const [field, order] = sortStr.split(' ');
            const formattedSortBy = getFormattedSort({ field, order });
            this.state = {
                sortBy: formattedSortBy,
            };
        } else {
            if (defaultSort.field && defaultSort.order) {
                const formattedSortBy = getFormattedSort(defaultSort);
                this.state = {
                    sortBy: formattedSortBy,
                };
            } else {
                this.state = {
                    sortBy: { value: '' },
                };
            }
        }
    }

    componentDidMount() {
        const {
            defaultSort: sortBy,
            helpers: { setSortConfiguration },
            unbxdCore,
            sortOptions,
        } = this.props;

        //Set the main config
        let sortOn = null;
        const { sort = '' } = unbxdCore.getQueryParams();
        if (typeof sort === 'string' && sort.length) {
            const [field, order] = sort.split(' ');
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
            sortOn = sortBy;
        }

        if (unbxdCore.state.responseObj === null) {
            const { field = '', order = '' } = sortOn;
            if (field.length && order.length) {
                setSortConfiguration({
                    sortBy: `${sortOn.field} ${sortOn.order}`,
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        const { unbxdCore, unbxdCoreStatus } = this.props;
        const { sort } = unbxdCore.getQueryParams();
        if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === 'READY' &&
            sort === undefined
        ) {
            this.setState({ sortBy: { value: '' } });
        }
    }

    getSortProps() {
        const {
            unbxdCore,
            label,
            helpers: { setSortConfiguration },
        } = this.props;
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);

        const { noOfPages = 0 } = getPaginationInfo() || {};

        const { sortOptions = [], displayType, SortItemComponent } = this.props;

        //format datas for better handling.
        const formattedSortByOptions = sortOptions.map((sortByoption) =>
            getFormattedSort(sortByoption, this.state.sortBy)
        );

        const onSortClick = (event) => {
            const newSortBy =
                event.target.dataset.unxsortby || event.target.value;
            const selectedSort = getSelectedSort(
                newSortBy,
                formattedSortByOptions
            );

            const { field = '', order = '' } = selectedSort;

            if (field.length && order.length) {
                this.setState({ sortBy: selectedSort });
                //we pass `price desc` format to set Configuration
                setSortConfiguration(
                    {
                        sortBy: `${field} ${order}`,
                    },
                    true
                );
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
                    sortBy: '',
                },
                true
            );
        };

        const data = {
            sortOptions: formattedSortByOptions,
            displayType,
            noOfPages,
            ...this.state,
        };
        const helpers = {
            SortItemComponent,
            onSortClick,
            onSortResetClick,
            label,
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
    defaultSort: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            order: PropTypes.string,
        })
    ).isRequired,
    displayType: PropTypes.string,
    SortItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    label: PropTypes.node,
};

export default SortContainer;
