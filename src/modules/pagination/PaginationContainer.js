import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer, executeCallback } from '../../common/utils';
import PaginationWrapper from './PaginationWrapper';

class PaginationContainer extends React.PureComponent {
    componentDidMount() {
        const { unbxdCore } = this.props;
        const queryParams = unbxdCore.getQueryParams();
        const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
        if (queryParams.start) {
            setPageStart(parseInt(queryParams.start));
        } else {
            setPageStart(0);
        }
    }

    getPaginationProps() {
        const { unbxdCore, paginationItemComponent, onPageChange } = this.props;
        const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);

        const { padding, paginationType } = this.props;

        const {
            currentPage = 0,
            isNext = false,
            isPrev = false,
            noOfPages = 0,
            rows = 0
        } = unbxdCore.getPaginationInfo() || {};

        const handleNextPageClick = () => {
            const newPageNumber = rows * currentPage;
            const onFinish = () => {
                setPageStart(newPageNumber);
                getResults();
            };
            executeCallback(onPageChange, [newPageNumber], onFinish);
        };

        const handlePreviousPageClick = () => {
            const newPageNumber = (currentPage - 2) * rows;
            const onFinish = () => {
                setPageStart(newPageNumber);
                getResults();
            };
            executeCallback(onPageChange, [newPageNumber], onFinish);
        };

        const handlePageClick = (pageNumberOption) => {
            const pageNo = pageNumberOption.target
                ? parseInt(pageNumberOption.target.dataset.pagenumber)
                : pageNumberOption.pageNumber;
            const newPageNumber = (pageNo - 1) * rows;
            const onFinish = () => {
                setPageStart(newPageNumber);
                getResults();
            };
            executeCallback(onPageChange, [newPageNumber], onFinish);
        };

        const data = {
            isNext,
            isPrev,
            noOfPages,
            currentPage,
            padding,
            paginationType
        };

        const helpers = {
            onNextPageClick: handleNextPageClick,
            onPreviousPageClick: handlePreviousPageClick,
            onPageClick: handlePageClick,
            paginationItemComponent
        };

        return { ...data, ...helpers };
    }

    render() {
        const DefaultRender = PaginationWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getPaginationProps(),
            DefaultRender
        );
    }
}

PaginationContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    padding: PropTypes.number,
    paginationItemComponent: PropTypes.element,
    paginationType: PropTypes.string.isRequired,
    onPageChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default PaginationContainer;
