import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import UnbxdSearchWrapper, { Products } from '@unbxd-ui/react-search-sdk';
import '@unbxd-ui/react-search-sdk/public/dist/css/core.css';

const productMap = {
    productName: "title",
    uniqueId: "uniqueId",
    imageUrl: "imageUrl",
    price: "RRP_Price",
    sellingPrice: "unbxd_price",
    productUrl: "productUrl"
}

const productVariantMap = {
    productName: "v_title",
    uniqueId: "vId",
    imageUrl: "v_imageUrl",
    price: "v_RRP_Price",
    sellingPrice: "v_unbxd_price"
}

class NoProductsComponent extends React.Component {
    render() {
        return (<p>No products found!!!</p>);
    }
}

const App = () => {
    const [counter, setCounter] = useState(0);

    return (<UnbxdSearchWrapper
        siteKey='wildearthclone-neto-com-au808941566310465'
        apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>
        <p>Hello world</p>
        <Products
            paginationType={'INFINITE_SCROLL'}
            heightDiffToTriggerNextPage={50}
            perRow={3}
            pageSize={20}
            productViewTypes={["LIST", "GRID"]}
            ZeroResultsComponent={NoProductsComponent}
            productMap={productMap}
            showVariants={true}
            variantsCount={2}
            productVariantMap={productVariantMap} />
    </UnbxdSearchWrapper>)
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
