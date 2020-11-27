import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Products from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';

const searchResponse = {
    searchMetaData: {
        status: 0,
        queryTime: 46,
        queryParams: {
            'log.response': 'false',
            'module.exclude': 'personalization',
            'alternate.op': 'true',
            'q.op': 'AND',
            variants: 'true',
            'f.categoryPath.facet.limit': '100',
            'variants.count': '4',
            'req.rm.promotionEngine': 'true',
            'variants.groupby': 'variant_color',
            'facet.multiselect': 'true',
            'original.q': 'boots',
            start: '0',
            'req.rm.asterix': 'true',
            rows: '10',
            version: 'V2',
            enableTaxonomy: 'false',
            'variants.relevant': 'true',
            'f.categoryPath.displayName': 'category',
            q: 'boots',
            'f.categoryPath.max.depth': '6',
            spellcheck: 'true',
            viewType: 'GRID',
            enablePf: 'false',
            'facet.multilevel': 'categoryPath',
            'user.behaviour': 'true',
            fields: 'title,uniqueId,imageUrl,RRP_Price,unbxd_price,productUrl',
            'facet.version': 'V2',
            enablePopularity: 'true',
            'variants.fields':
                'v_title,vId,imageUrl,v_RRP_Price,v_unbxd_price,productUrl,variantId,variant_overhead_swatch,variant_image_array,variant_cheapest_default_price,variant_min_cheapest_msrp,variant_productUrl',
        },
    },
    response: {
        numberOfProducts: 159,
        start: 0,
        products: [
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/vasque-breeze-all-terrain-gtx-mens-hiking-boots-br/V7040W',
                unbxd_price: '329.95',
                title:
                    'Vasque Breeze All-Terrain GTX Mens Hiking Boots - Brown Olive/Bossa Nova',
                uniqueId: 'V7040W',
                RRP_Price: '369.99',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/V7040W.jpg',
                ],
                variantTotal: 11,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/vasque-breeze-all-terrain-gtx-womens-hiking-boots/V7023W',
                unbxd_price: '329.95',
                title:
                    'Vasque Breeze All-Terrain GTX Womens Hiking Boots - Gargyle',
                uniqueId: 'V7023W',
                RRP_Price: '369.99',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/V7023W.jpg',
                ],
                variantTotal: 8,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/scarpa-phantom-6000-mountaineering-boots-black-ora/SCA40017-BlackOrange',
                unbxd_price: '979.50',
                title:
                    'Scarpa Phantom 6000 Unisex Waterproof Mountaineering Boots',
                uniqueId: 'SCA40017-BlackOrange',
                RRP_Price: '1099.95',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/SCA40017-BlackOrange.jpg',
                ],
                variantTotal: 8,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/scarpa-mont-blanc-pro-gtx-goretex-mountaineering-b/SCA40013',
                unbxd_price: '468.65',
                title:
                    'Scarpa Mont Blanc Pro GTX Goretex Unisex Mountaineering Boots',
                uniqueId: 'SCA40013',
                RRP_Price: '749.95',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/SCA40013.jpg',
                ],
                variantTotal: 3,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/scarpa-terra-gtx-unisex-shoes-brown/SCA00108',
                unbxd_price: '309.95',
                title:
                    'Scarpa Terra Goretex Unisex Waterproof Hiking Boots - Brown',
                uniqueId: 'SCA00108',
                RRP_Price: '349.95',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/SCA00108.jpg',
                ],
                variantTotal: 12,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/scarpa-delta-leather-fly-mens-hiking-boots-mens-hi/SCA00090',
                unbxd_price: '349.50',
                title:
                    'Scarpa Delta Leather Fly Mens Waterproof Hiking Boots - T.Di Moro',
                uniqueId: 'SCA00090',
                RRP_Price: '399.95',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/SCA00090.jpg',
                ],
                variantTotal: 8,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/scarpa-delta-womens-leather-waterproof-hiking-boot/SCA00065',
                unbxd_price: '449.95',
                title:
                    'Scarpa Delta Womens Goretex Waterproof Leather Hiking Boots',
                uniqueId: 'SCA00065',
                RRP_Price: '499.95',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/SCA00065.jpg',
                ],
                variantTotal: 7,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/salomon-quest-prime-gtx-womens-hiking-boots-ebony/411299',
                unbxd_price: '269.95',
                title:
                    'Salomon Quest Prime GTX Womens Hiking Boots - Ebony/Black/Icy Morn',
                uniqueId: '411299',
                RRP_Price: '299.99',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/411299.jpg',
                ],
                variantTotal: 8,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/salomon-outblast-ts-cswp-mens-hiking-boots-black-b/409223',
                unbxd_price: '229.95',
                title:
                    'Salomon OUTblast TS CSWP Mens Hiking Boots - Black/Black/Black',
                uniqueId: '409223',
                RRP_Price: '259.99',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/409223.jpg',
                ],
                variantTotal: 9,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
            {
                productUrl:
                    'https://www.wildearth.com.au/buy/salomon-quest-prime-gtx-mens-hiking-shoes-phantom/404637',
                unbxd_price: '259.95',
                title:
                    'Salomon Quest Prime Goretex Mens Waterproof Hiking Boots - Phantom/Black/Quiet Shade',
                uniqueId: '404637',
                RRP_Price: '299.99',
                imageUrl: [
                    'https://www.wildearth.com.au/assets/full/404637.jpg',
                ],
                variantTotal: 10,
                score: 5545.9272,
                relevantDocument: 'parent',
                variantCount: 0,
                variants: [],
            },
        ],
    },
    facets: {
        text: {
            list: [
                {
                    facetName: 'brand_uFilter',
                    filterField: 'brand_uFilter',
                    values: [
                        'Keen',
                        18,
                        'Scarpa',
                        18,
                        'Salomon',
                        12,
                        'The North Face',
                        12,
                        'Merrell',
                        9,
                        'Vasque',
                        9,
                        'Burke and Wills',
                        8,
                        'Vango',
                        8,
                        'Sahara Swags',
                        7,
                        'Mammut',
                        5,
                        'Patagonia',
                        5,
                        'Rainbird',
                        4,
                        'Topo Athletic',
                        4,
                        'Lock Laces',
                        3,
                        'Oztrail',
                        3,
                        'Sea to Summit',
                        3,
                        'Teva',
                        3,
                        'Under Armour',
                        3,
                        "Arc'teryx",
                        2,
                        'Bridgedale',
                        2,
                        'Fjallraven',
                        2,
                        'HI-TEC',
                        2,
                        'Petzl',
                        2,
                        'SBR',
                        2,
                        'Wilderness Equipment',
                        2,
                        'Boot Bananas',
                        1,
                        'CamelBak',
                        1,
                        'Dakine',
                        1,
                        'Eclectic Products',
                        1,
                        'Gear Aid',
                        1,
                        'Grangers',
                        1,
                        'Jack Wolfskin',
                        1,
                        'Kuhl',
                        1,
                        'Metolius',
                        1,
                        'Osprey',
                        1,
                        'Yakima',
                        1,
                    ],
                    displayName: 'FILTER BY BRAND',
                    position: 1,
                },
                {
                    facetName: 'Best_Use_uFilter',
                    filterField: 'Best_Use_uFilter',
                    values: [
                        'Hiking',
                        107,
                        'Camping',
                        29,
                        'Mountaineering',
                        8,
                        'Everyday',
                        4,
                        'Multisport',
                        3,
                        'Travelling',
                        3,
                        'Running',
                        2,
                        'Climbing',
                        1,
                        'Snow',
                        1,
                        'Tactical',
                        1,
                    ],
                    displayName: 'FILTER BY BEST USE',
                    position: 3,
                },
                {
                    facetName: 'v_Size_uFilter',
                    filterField: 'v_Size_uFilter',
                    values: [
                        'US9',
                        81,
                        'US9.5',
                        68,
                        'US10',
                        67,
                        'US8.5',
                        64,
                        'US8',
                        59,
                        'US10.5',
                        44,
                        'US12',
                        43,
                        'US13',
                        42,
                        'US11.5',
                        40,
                        'US7.5',
                        38,
                        'US11',
                        35,
                        'US7',
                        29,
                        'US6',
                        20,
                        'US6.5',
                        20,
                        'L',
                        16,
                        'M',
                        16,
                        'XL',
                        15,
                        'S',
                        14,
                        'Single',
                        13,
                        'US12.5',
                        9,
                        'US13 Kids',
                        5,
                        'US5',
                        5,
                        'XS',
                        5,
                        'Double',
                        4,
                        'US1',
                        4,
                        'US12 Kids',
                        4,
                        'US2',
                        4,
                        'US3',
                        4,
                        'US4',
                        4,
                        'XXL',
                        3,
                        '46',
                        2,
                        '48',
                        2,
                        '50',
                        2,
                        '52',
                        2,
                        '54',
                        2,
                        'XXXL',
                        2,
                        '32',
                        1,
                        '34',
                        1,
                        '36',
                        1,
                        '6',
                        1,
                        'US13.5',
                        1,
                        'US14',
                        1,
                    ],
                    displayName: 'FILTER BY SIZE',
                    position: 5,
                },
                {
                    facetName: 'v_Bag_Type_uFilter',
                    filterField: 'v_Bag_Type_uFilter',
                    values: [
                        'Climbing',
                        1,
                        'Daypacks',
                        1,
                        'Duffel Bags',
                        1,
                        'Hiking Packs',
                        1,
                        'Wheeled Luggage',
                        1,
                    ],
                    displayName: 'FILTER BY BAG TYPE',
                    position: 7,
                },
                {
                    facetName: 'v_Fitment_uFilter',
                    filterField: 'v_Fitment_uFilter',
                    values: ['Regular', 72, 'Slim', 2, 'Wide', 2],
                    displayName: 'FILTER BY FITMENT',
                    position: 9,
                },
                {
                    facetName: 'v_Swag_Type_uFilter',
                    filterField: 'v_Swag_Type_uFilter',
                    values: ['Dome', 12, 'Traditional', 6],
                    displayName: 'FILTER BY SWAG TYPE',
                    position: 11,
                },
                {
                    facetName: 'v_Capacity_uFilter',
                    filterField: 'v_Capacity_uFilter',
                    values: ['3 Person', 5, '2 Person', 4, '4 Person', 1],
                    displayName: 'FILTER BY CAPACITY',
                    position: 12,
                },
                {
                    facetName: 'v_Season_uFilter',
                    filterField: 'v_Season_uFilter',
                    values: ['3 Season', 6, '4 Season', 4],
                    displayName: 'FILTER BY SEASON',
                    position: 13,
                },
                {
                    facetName: 'v_Pant_Type_uFilter',
                    filterField: 'v_Pant_Type_uFilter',
                    values: ['Waterproof', 11, 'Hiking', 6, 'Softshell', 1],
                    displayName: 'FILTER BY PANT TYPE',
                    position: 15,
                },
                {
                    facetName: 'v_Gender_uFilter',
                    filterField: 'v_Gender_uFilter',
                    values: ['Men', 51, 'Women', 46, 'Unisex', 9, 'Kids', 8],
                    displayName: 'FILTER BY GENDER',
                    position: 16,
                },
                {
                    facetName: 'v_Colour_uFilter',
                    filterField: 'v_Colour_uFilter',
                    values: [
                        'Black',
                        45,
                        'Brown',
                        41,
                        'Green',
                        25,
                        'Grey',
                        24,
                        'Blue',
                        12,
                        'Red',
                        6,
                        'Orange',
                        3,
                        'Yellow',
                        2,
                    ],
                    displayName: 'FILTER BY COLOUR',
                    position: 17,
                },
            ],
        },
        range: {
            list: [
                {
                    facetName: 'price',
                    values: {
                        counts: [
                            '0.0',
                            21,
                            '100.0',
                            18,
                            '200.0',
                            60,
                            '300.0',
                            38,
                            '400.0',
                            13,
                            '600.0',
                            1,
                            '700.0',
                            4,
                            '900.0',
                            3,
                            '1000.0',
                            1,
                        ],
                        gap: 100,
                        start: 0,
                        end: 4000,
                    },
                    displayName: 'FILTER BY PRICE',
                    position: 4,
                },
            ],
        },
        multilevel: {
            bucket: [
                {
                    values: ['All Products', 159, 'Camp & Hike', 1],
                    position: 0,
                    displayName: 'category',
                    filterParam: 'categoryPath1_fq',
                    level: 1,
                    multiLevelField: 'categoryPath',
                },
            ],
            breadcrumb: {},
        },
    },
};

test('Match Snapshot for products', () => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(searchResponse),
        });
    });

    const attributesMap = {
        productName: 'title',
        uniqueId: 'uniqueId',
        imageUrl: 'imageUrl',
        price: 'min_cheapest_default_price',
        productUrl: 'productUrl',
    };
    const tree = renderer
        .create(
            
                <UnbxdSearchWrapper
                    siteKey="wildearthclone-neto-com-au808941566310465"
                    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
                >
                    <Products attributesMap={attributesMap} />
                    <div>
                        <SearchBox defaultSearch="shoes" />
                    </div>
                </UnbxdSearchWrapper>
            
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('No products found test', async () => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(searchResponse),
        });
    });
    const attributesMap = {
        productName: 'title',
        uniqueId: 'uniqueId',
        imageUrl: 'imageUrl',
        price: 'min_cheapest_default_price',
        productUrl: 'productUrl',
    };
    render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );
    screen.debug(null, 20000);
    await waitFor(() => expect(screen.getByText("Vasque Breeze")).toBeInTheDocument());
});
