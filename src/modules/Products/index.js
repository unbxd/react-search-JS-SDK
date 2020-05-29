import React from 'react';
import AppContext, { AppContextConsumer } from '../../common/context'
import { ProductContextProvider } from './context'

import PropTypes from 'prop-types';

import ViewTypes from './ViewTypes';
import ProductsView from './ProductsView';
import { conditionalRenderer } from '../../common/utils';

class Products extends React.PureComponent {

    ProductContext = React.createContext();

    static contextType = AppContext;

    static ViewTypes = ViewTypes;
    static ProductsView = ProductsView;

    onViewToggle = (event) => {
        this.setState({ isGrid: event.target.id === 'Unbx-grid' })
    }

    constructor(props) {
        super(props);

        //Set all data that is required in state so that it can be passed down to children
        const { ZeroResultsTemplate, per_row, per_page,
            infiniteScroll, loadOnClick, fieldMap, variantMap } = this.props

        this.state = {
            isGrid: true,
            onViewToggle: this.onViewToggle,
            ZeroResultsTemplate,
            per_row,
            per_page,
            infiniteScroll,
            loadOnClick,
            fieldMap,
            variantMap
        }
    }

    componentDidMount() {

        const { helpers: { setProductConfiguration } } = this.context;

        const { per_page, fieldMap, variants,
            variantCount, variantMap } = this.props

        //generate required fields here based on fieldMap and variantFields
        const requiredFields = Object.values(fieldMap);
        const variantRequiredFields = Object.values(variantMap);

        //Set the main config with these local configs
        setProductConfiguration({
            per_page, requiredFields, variants, variantCount, variantRequiredFields
        });
    }

    render() {

        const { per_page } = this.state;

        return (<AppContextConsumer>
            {({ unbxdCore }) => {

                const getSearchResults = unbxdCore.getSearchResults.bind(unbxdCore);
                //Wrap this in a function so that there is only one function call
                const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
                const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
                const getResults = unbxdCore.getResults.bind(unbxdCore);

                //Get next page method
                const getNextPage = () => {

                    //Get the next batch by jumping the current per_page
                    const { currentPage } = getPaginationInfo();
                    const newStart = currentPage === 0 ? per_page : currentPage + per_page;
                    setPageStart(newStart);
                    getResults();
                }

                const unbxdProductCardClickHandler = () => {
                    console.log("hello from unbxdProductCardClickHandler")
                }

                //onClick for products
                //We also need to pass infinite scroll method
                const getProductsProp = ({ onClick, ...props }) => ({
                    onClick: () => {
                        unbxdProductCardClickHandler();
                        onClick();
                    },
                    getSearchResults,
                    getNextPage,
                    ...props
                })

                const DefaultRender = <React.Fragment>
                    <ViewTypes />
                    <ProductsView />
                </React.Fragment>

                //We will be using components here which can also be used as compound components
                //We need to send prop getters for render props. mainly onclick
                return (<ProductContextProvider value={{ ...this.state, getSearchResults, getNextPage, unbxdProductCardClickHandler }}>
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
    per_row: 5,
    per_page: 10,
    //requiredFields: ["imageUrl", "title", "price"],
    fieldMap: { productName: "title", uniqueId: "uniqueId", imageUrl: "imageUrl" },
    ZeroResultsTemplate: false,
    infiniteScroll: false,
    loadOnClick: false,
    variants: false,
}

Products.propTypes = {
    per_row: PropTypes.number,
    per_page: PropTypes.number,
    fieldMap: PropTypes.object.isRequired,
    ZeroResultsTemplate: PropTypes.oneOfType([PropTypes.element, PropTypes.bool, PropTypes.func]),
    infiniteScroll: PropTypes.bool,
    loadOnClick: PropTypes.bool,
    variants: PropTypes.bool,
    variantCount: PropTypes.number,
    variantMap: PropTypes.object,
    variantRequiredFields: PropTypes.arrayOf(PropTypes.string),
}

export default Products;
