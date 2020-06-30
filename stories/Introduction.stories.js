import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';
import Products from '../src/modules/products';
import Pagination from '../src/modules/pagination';
import Sort from '../src/modules/sort';
import Facets from '../src/modules/facets';
import Banners from '../src/modules/banners';
import SpellCheck from '../src/modules/spellCheck';

const stories = storiesOf('Introduction', module).addParameters({
    props: {
        propTablesExclude: [SearchBox,
            Products,
            Pagination,
            Sort,
            Facets,
            Banners,
            SpellCheck
        ]
    }
});

const productAttributes = {
    productName: "title",
    uniqueId: "uniqueId",
    imageUrl: "imageUrl",
    price: "RRP_Price",
    sellingPrice: "unbxd_price",
    productUrl: "productUrl"
}

const variantAttributes = {
    productName: "v_title",
    uniqueId: "vId",
    imageUrl: "v_imageUrl",
    price: "v_RRP_Price",
    sellingPrice: "v_unbxd_price"
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

stories.add('search', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />

    <SpellCheck />

    <Banners altText='ALT Banner Image' />

    <Pagination
        pageSize={15}
        pageSizeOptions={pageSizeOptions} />

    <Sort
        defaultSort={{
            "label": "Brand A-Z",
            "field": "title",
            "order": "asc"
        }}
        sortOptions={sortOptions} />

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
        productAttributes={productAttributes}
        showVariants={true}
        variantsCount={2}
        variantAttributes={variantAttributes}
    />

</UnbxdSearchWrapper >));

stories.add('category', () => {

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

    return (<UnbxdSearchWrapper
        siteKey='wildearthclone-neto-com-au808941566310465'
        apiKey='e6959ae0b643d51b565dc3e01bf41ec1'
        getCategoryId={getCategoryId}
        productType={'CATEGORY'}
    >

        <SearchBox />

        <Products
            paginationType={'FIXED_PAGINATION'}
            perRow={3}
            pageSize={20}
            productViewTypes={["GRID", "LIST"]}
            productAttributes={productAttributes}
            showVariants={true}
            variantsCount={2}
            variantAttributes={variantAttributes}
        />

    </UnbxdSearchWrapper >)
});
