import React from 'react';
import PropTypes from 'prop-types';

import AppContext, { AppContextConsumer } from '../../common/context'
import { PaginationContextProvider } from './context'
import Navigation from './navigation';
import NumberOfProducts from './numberOfProducts';
import { conditionalRenderer } from '../../common/utils';

class Pagination extends React.PureComponent {

    ProductContext = React.createContext();
    static contextType = AppContext;

    static NumberOfProducts = NumberOfProducts;
    static Navigation = Navigation;


    constructor(props) {
        super(props);

        const { pageSize, pageSizeOptions, pageSizeDisplayType } = this.props;
        this.state = {
            pageSize,
            pageSizeOptions,
            pageSizeDisplayType
        }
    }

    componentDidMount() {
        const { helpers: { setPaginationConfiguration } } = this.context;

        const { pageSize } = this.props;

        //Set the main config
        setPaginationConfiguration({
            pageSize
        });
    }

    getNavigationMethods() {
        const { unbxdCore } = this.context;
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
        const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);

        const { currentPage = 0,
            isNext = false,
            isPrev = false,
            noOfPages = 0,
            rows = 0 } = getPaginationInfo() || {};

        const onNextPageClick = () => {
            const newPageNumber = rows * currentPage;
            setPageStart(newPageNumber);
            getResults();

        }

        const onPreviousPageClick = () => {
            const newPageNumber = (currentPage - 2) * rows;
            setPageStart(newPageNumber);
            getResults();
        }

        const onPageClick = (event) => {
            const pageNo = parseInt(event.target.dataset.pagenumber);
            const newPageNumber = (pageNo - 1) * rows;
            setPageStart(newPageNumber);
            getResults();
        }
        return {
            onNextPageClick,
            onPreviousPageClick,
            onPageClick,
            isNext,
            isPrev,
            noOfPages,
            currentPage
        }

    }

    render() {

        const { PageSizeListComponent } = this.props;

        const onPageSizeClick = (event) => {

            const { helpers: { setPaginationConfiguration } } = this.context;

            const newPageSize = parseInt(event.target.dataset.unxpagesize) || parseInt(event.target.value);
            this.setState({ pageSize: newPageSize })
            setPaginationConfiguration({
                pageSize: newPageSize
            }, true);

        }


        const DefaultRender = <React.Fragment>
            <NumberOfProducts />
            <Navigation />
        </React.Fragment>

        return (<AppContextConsumer>
            {() => {

                const getProps = () => {
                    return {
                        ...this.state,
                        onPageSizeClick,
                        PageSizeListComponent,
                        ...this.getNavigationMethods()

                    }
                }

                //Pass data and helpers to render props
                return (<PaginationContextProvider value={getProps()}>
                    {conditionalRenderer(this.props.children, getProps(), DefaultRender)}
                </PaginationContextProvider>)
            }}
        </AppContextConsumer>)
    }

}

Pagination.defaultProps = {
    pageSize: 10,
    pageSizeOptions: [{ id: 5, value: "5" }, { id: 10, value: "10" }, { id: 15, value: "15" }],
    pageSizeDisplayType: 'DROPDOWN',
    pagePadding: 2,
}

Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    pageSizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string }))
        .isRequired,
    pageSizeDisplayType: PropTypes.string.isRequired,
    PageSizeListComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    pagePadding: PropTypes.number
}

export default Pagination;
