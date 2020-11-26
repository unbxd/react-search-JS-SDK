import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import PaginationWrapper from './PaginationWrapper';
import { executeCallback } from '../../common/utils';

class PaginationContainer extends React.PureComponent {
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
            rows = 0,
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
                ? parseInt(event.target.dataset.pagenumber)
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
            paginationType,
        };

        const helpers = {
            onNextPageClick: handleNextPageClick,
            onPreviousPageClick: handlePreviousPageClick,
            onPageClick: handlePageClick,
            paginationItemComponent,
        };

        return { ...data, ...helpers };
    }

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
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    padding: PropTypes.number,
    paginationItemComponent: PropTypes.element,
    paginationType: PropTypes.string.isRequired,
    onPageChange: PropTypes.func,
};

export default PaginationContainer;
