import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';
import Products from '../src/modules/products';
import Pagination from '../src/modules/pagination';
import Sort from '../src/modules/sort';
import Facets from '../src/modules/facets';
import Banners from '../src/modules/banners';
import SpellCheck from '../src/modules/spellCheck';

export default {
    title: 'Introduction',
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

const pageSizeOptions = [
    {
        id: 5, value: "5"
    },
    {
        id: 10, value: "10"
    },
    {
        id: 15, value: "15"
    },
    {
        id: 20, value: "20"
    }
];

const sortOptions = [
    {
        "label": "Most Popular"
    },
    {
        "label": "Newest",
        "field": "Date_Added",
        "order": "desc"
    },
    {
        "label": "Lowest Price",
        "field": "price",
        "order": "asc"
    },
    {
        "label": "Highest Price",
        "field": "price",
        "order": "desc"
    },
    {
        "label": "Brand A-Z",
        "field": "title",
        "order": "asc"
    },
    {
        "label": "Brand Z-A",
        "field": "title",
        "order": "desc"
    }
]

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

        <SpellCheck />
        
        <Banners altText='ALT Banner Image' />

        <Pagination
            pageSize={15}
            pageSizeOptions={pageSizeOptions}
            pageSizeDisplayType={'DROPDOWN'}
            pagePadding={2} />

        <Sort
            defaultSort={{
                "label": "Brand A-Z",
                "field": "title",
                "order": "asc"
            }}
            sortOptions={sortOptions}
            sortDisplayType={'DROPDOWN'} />

        <Facets
            isApplyFilters={true}
            isClearFilters={true}
            moveFacetsOnSelect={true}
            categoryDisplayName={'category'}
            categoryField={'categoryPath'}
        />

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
