import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

export default {
    title: 'Introduction',
    //component: Products
}

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

const onIntialResultLoad = (unbxdSearchObject) => {
    console.log("onIntialResultLoad", unbxdSearchObject);
}

const onPageLoad = (unbxdSearchObject) => {
    console.log("onPageLoad", unbxdSearchObject);
}

const getCategoryId = () => {
    if (window.UnbxdAnalyticsConf) {
        return encodeURIComponent(window.UnbxdAnalyticsConf["page"]);
    }

}

export const Introduction = () => {

    return (<UnbxdSearchWrapper
        siteKey='wildearthclone-neto-com-au808941566310465'
        apiKey='e6959ae0b643d51b565dc3e01bf41ec1'
        onIntialResultLoad={onIntialResultLoad}
        onPageLoad={onPageLoad}
        getCategoryId={getCategoryId}
        productType={'SEARCH'}
    >

        <SearchBox />

        <Products
            paginationType={'FIXED_PAGINATION'}
            perRow={3}
            pageSize={20}
            productViewTypes={["GRID", "LIST"]}
            productMap={productMap}
            showVariants={true}
            variantsCount={2}
            productVariantMap={productVariantMap}
        />

    </UnbxdSearchWrapper >)
};


export const IntroductionCategoryPages = () => {

    class CategoryPage extends React.Component {

        constructor() {
            super();

            //explicitly setting the UnbxdAnalyticsConf
            window.UnbxdAnalyticsConf = {
                "0": "l",
                "1": "i",
                "2": "g",
                "3": "h",
                "4": "t",
                "page": "All Products>Boots",
                "page_type": "CATEGORY_PATH"
            }
        }
        state = { productType: 'CATEGORY' };

        render() {
            const { productType } = this.state;

            return (<UnbxdSearchWrapper
                siteKey='wildearthclone-neto-com-au808941566310465'
                apiKey='e6959ae0b643d51b565dc3e01bf41ec1'
                onIntialResultLoad={onIntialResultLoad}
                onPageLoad={onPageLoad}
                getCategoryId={getCategoryId}
                productType={productType}
            >

                <SearchBox />

                <Products
                    paginationType={'FIXED_PAGINATION'}
                    perRow={3}
                    pageSize={20}
                    productViewTypes={["GRID", "LIST"]}
                    productMap={productMap}
                    showVariants={true}
                    variantsCount={2}
                    productVariantMap={productVariantMap}
                />

            </UnbxdSearchWrapper >)
        }
    }

    return (<CategoryPage />)
};
