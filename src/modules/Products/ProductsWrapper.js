import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import GridView from './GridView';
import ListView from './ListView';

class ProductsWrapper extends React.PureComponent {

    constructor(props) {
        super(props);
        this.infiniteScrollTrigger = createRef();

        const { products, infiniteScroll, loadOnClick } = this.props;
        this.state = {
            products,
            infiniteScroll,
            loadOnClick
        }
    }

    //Keep appending to the list as we keep getting the products.
    nextPageCallback = entries => {
        const { getNextPage } = this.props;
        const infiniteScrollerObs = entries[0];

        //Check if `isIntersecting` is true. 
        //If true make the call for the next page.
        if (infiniteScrollerObs.isIntersecting) {
            console.log("Loading new page");
            getNextPage();
        }

    };

    loadMoreHandler = () => {
        const { getNextPage } = this.props;

        console.log("Loading new page");
        getNextPage();
    }

    componentDidMount() {
        if (this.infiniteScrollTrigger.current) {
            this.observer = new IntersectionObserver(this.nextPageCallback, {
                threshold: 1,
            });
            this.observer.observe(this.infiniteScrollTrigger.current);
        }
    }

    componentWillUnmount() {
        if (this.infiniteScrollTrigger.current) {
            this.observer.observe(this.infiniteScrollTrigger.current);
        }
    }

    static getDerivedStateFromProps(props, state) {

        //What do we do when the latest page brings us empty results
        if (props.products.length === 0 && (state.infiniteScroll || state.loadOnClick)) {
            //We can set state for `no more results`
            return { infiniteScroll: false, loadOnClick: false }
        }

        if (state.products !== props.products && (state.infiniteScroll || state.loadOnClick)) {
            //Check if we have reached the end of search results
            //How do we differentiate the zero results in loadMore/infiniteScroll and a new query
            return { products: [...state.products, ...props.products] }
        }

        return null;

    }

    render() {

        const { isGrid, unbxdProductCardClickHandler, per_row, fieldMap, variantMap } = this.props;
        const { products, infiniteScroll, loadOnClick } = this.state;

        return (<React.Fragment>
            {isGrid ?
                <GridView per_row={per_row}
                    fieldMap={fieldMap}
                    products={products}
                    unbxdProductCardClickHandler={unbxdProductCardClickHandler}
                    variantMap={variantMap} /> :
                <ListView fieldMap={fieldMap}
                    products={products}
                    unbxdProductCardClickHandler={unbxdProductCardClickHandler}
                    variantMap={variantMap} />}
            {infiniteScroll && <div className='Unbx-infinitescroll-trigger' ref={this.infiniteScrollTrigger} />}
            {loadOnClick && <div className='Unbx-product-load-more' onClick={this.loadMoreHandler}>
                Load more
            </div>}
        </React.Fragment>)
    }
}

ProductsWrapper.propTypes = {
    isGrid: PropTypes.bool.isRequired
}

export default ProductsWrapper;
