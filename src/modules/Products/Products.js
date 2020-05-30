import React from 'react';
import AppContext, { AppContextConsumer } from '../../common/context'
import { ProductContextProvider } from './context'

import PropTypes from 'prop-types';

import ViewTypes from './ViewTypes';
import ProductsView from './ProductsView';
import { conditionalRenderer } from '../../common/utils';
import { getProductViewType } from './utils'

class Products extends React.PureComponent {

    ProductContext = React.createContext();

    static contextType = AppContext;

    static ViewTypes = ViewTypes;
    static ProductsView = ProductsView;

    onViewToggle = (event) => {
        this.setState({ productViewType: event.target.dataset.viewtype })
    }

    constructor(props) {
        super(props);

        const { ZeroResultsComponent, perRow, pageSize,
            paginationType, productMap, productVariantMap, productViewTypes,
            heightDiffToTriggerNextPage } = this.props

        //Lets fallback to grid view
        const productViewType = getProductViewType(productViewTypes)[0];

        this.state = {
            productViewTypes,
            productViewType,
            ZeroResultsComponent,
            perRow,
            pageSize,
            paginationType,
            heightDiffToTriggerNextPage,
            productMap,
            productVariantMap
        }
    }

    componentDidMount() {

        const { helpers: { setProductConfiguration } } = this.context;

        const { pageSize, productMap, showVariants,
            variantsCount, productVariantMap } = this.props

        //generate required fields here based on productMap and productVariantMap
        const requiredFields = Object.values(productMap);
        const variantRequiredFields = Object.values(productVariantMap);

        //Set the main config
        setProductConfiguration({
            pageSize, requiredFields, showVariants, variantsCount, variantRequiredFields
        });
    }

    getProps = () => {
        return { ...this.state, helpers: this.helpers }
    }

    render() {

        const { pageSize } = this.state;

        return (<AppContextConsumer>
            {({ unbxdCore }) => {

                const getSearchResults = unbxdCore.getSearchResults.bind(unbxdCore);
                const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
                const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
                const getResults = unbxdCore.getResults.bind(unbxdCore);

                //Get next page method
                const getNextPage = () => {

                    const { currentPage } = getPaginationInfo();
                    const newStart = currentPage === 0 ? pageSize : (currentPage * pageSize);
                    setPageStart(newStart);
                    getResults();
                    console.log("called getNextPage")
                }

                const onProductClick = (event) => {
                    console.log("Click event on product ", event.target.dataset.uniqueid)
                }

                //onClick for products
                const getProductsProp = ({ onClick, ...props }) => ({
                    onClick: () => {
                        onProductClick();
                        onClick();
                    },
                    getSearchResults,
                    getNextPage,
                    ...props
                })

                const helpers = {
                    onViewToggle: this.onViewToggle,
                    getSearchResults,
                    getNextPage,
                    onProductClick
                }

                const getProps = () => ({ ...this.state, ...helpers })

                const DefaultRender = <React.Fragment>
                    <ViewTypes />
                    <ProductsView />
                </React.Fragment>

                return (<ProductContextProvider value={getProps()}>
                    {conditionalRenderer(this.props.children, {
                        state: this.state,
                        getProductsProp,
                    }, DefaultRender)}
                </ProductContextProvider>)
            }
            }
        </AppContextConsumer >)
    }
}

Products.defaultProps = {
    perRow: 5,
    pageSize: 10,
    productMap: { productName: "title", uniqueId: "uniqueId", imageUrl: "imageUrl" },
    ZeroResultsComponent: false,
    paginationType: 'FIXED_PAGINATION',
    heightDiffToTriggerNextPage: 50,
    showVariants: false,
}

Products.propTypes = {
    perRow: PropTypes.number,
    pageSize: PropTypes.number,
    productMap: PropTypes.object.isRequired,
    ZeroResultsComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    paginationType: PropTypes.string,
    heightDiffToTriggerNextPage: PropTypes.number,
    showVariants: PropTypes.bool,
    variantsCount: PropTypes.number,
    productVariantMap: PropTypes.object,
}

export default Products;
