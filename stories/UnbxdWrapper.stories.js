import React from 'react';
import UnbxdSearchWrapper from '../src/App';

import Products from '../src/modules/Products';

export default {
    title: 'UnbxdSearchWrapper'
}

class NoProductsComponent extends React.Component {
    render() {
        return (<p>No products found!!!</p>);
    }
}

export const UnbxdSearchWrapperComponent = () => (<UnbxdSearchWrapper
    siteName='prod-rugsusa808581564092094'
    siteKey='ea4823934059ff8ad5def0be04f8dd4e'>
    {/* <Products requiredFields={['title', 'imageUrl']} ZeroResultsTemplate={() => (<p>Such emptiness!!</p>)} /> */}

    {/* for rugsUSA */}
    <Products
        requiredFields={['title', 'imageUrl']}
        per_row={3}
        per_page={6}
        ZeroResultsTemplate={NoProductsComponent}
        fieldMap={{ productName: "title", uniqueId: "uniqueId", imageUrl: "image_array", price: "max_cheapest_default_price", sellingPrice: "min_cheapest_default_price", productUrl: "productUrl" }}
        variants={true}
        variantCount={5}
        variantMap={{ productName: "title", uniqueId: "v_id", imageUrl: "image_array", price: "max_cheapest_default_price", sellingPrice: "min_cheapest_default_price" }}
    />

    {/* For wildearth */}
    {/* <Products
        requiredFields={['title', 'imageUrl']}
        infiniteScroll={true}
        per_row={3} 
        per_page={6}
        ZeroResultsTemplate={NoProductsComponent}
        //requiredFields={['title', 'imageUrl', 'RRP_Price', 'unbxd_price']}
        fieldMap={{ productName: "title", uniqueId: "uniqueId", imageUrl: "imageUrl", price: "RRP_Price", sellingPrice: "unbxd_price" }}
        variants={true}
        variantCount={2}
        variantMap={{ productName: "v_title", uniqueId: "vId", imageUrl: "v_imageUrl", price: "v_RRP_Price", sellingPrice: "v_unbxd_price" }}
        variantRequiredFields={["v_title", "vId", "v_imageUrl", 'v_RRP_Price', 'v_unbxd_price']} /> */}

    {/* <Products requiredFields={['title', 'imageUrl']} >
        {({ isGrid, onViewToggle }) => {
            console.log("we got ", isGrid, onViewToggle);
            return (<div>Hello from renderprops</div>)
        }}
    </Products> */}


    {/* <Products per_row={3} per_page={6} infiniteScroll={true} loadOnClick={false} requiredFields={['title', 'imageUrl']} fieldMap={{ productName: "title", uniqueId: "uniqueId", imageUrl: "imageUrl" }}>
        <div className=''>
            <Products.ViewTypes />
        </div>
        <Products.ProductsView />
    </Products> */}

</UnbxdSearchWrapper >)  
