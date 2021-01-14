export const size5SearchResponse = {
    "searchMetaData": {
        "status": 0,
        "queryTime": 18,
        "queryParams": {
            "facet.multiselect": "true",
            "log.response": "false",
            "original.q": "*",
            "module.exclude": "personalization",
            "start": "0",
            "alternate.op": "true",
            "req.rm.asterix": "true",
            "q.op": "AND",
            "variants": "false",
            "rows": "5",
            "version": "V2",
            "enableTaxonomy": "false",
            "variants.count": "5",
            "q": "*",
            "req.rm.promotionEngine": "true",
            "viewType": "GRID",
            "enablePf": "false",
            "user.behaviour": "true",
            "fields": "PRODUCT_NAME,uniqueId,IMAGE_URL,PRODUCT_PRICE,PRODUCT_URL",
            "facet.version": "V2",
            "enablePopularity": "true"
        }
    },
    "response": {
        "numberOfProducts": 50,
        "start": 0,
        "products": [
            {
                "PRODUCT_PRICE": 69.95,
                "PRODUCT_NAME": "Dunlop Synthetic Gut 16 Tennis String Reel - White",
                "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-synthetic-gut-16-tennis-string-reel-white-2238",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1260-DEFAULT-s.jpg"
                ],
                "uniqueId": "T624835"
            },
            {
                "PRODUCT_PRICE": 12.0,
                "PRODUCT_NAME": "Dunlop Black Widow 17 Tennis String Set - Black",
                "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-black-widow-17-tennis-string-set-black-2233",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1255-DEFAULT-s.jpg"
                ],
                "uniqueId": "T624611"
            },
            {
                "PRODUCT_PRICE": 12.0,
                "PRODUCT_NAME": "Dunlop Black Widow 16 Tennis String Set - Black",
                "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-black-widow-16-tennis-string-set-black-2232",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1254-DEFAULT-s.jpg"
                ],
                "uniqueId": "T624610"
            },
            {
                "PRODUCT_PRICE": 15.0,
                "PRODUCT_NAME": "Dunlop Silk 16 Tennis String Set - Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-silk-16-tennis-string-set-natural-2231",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1253-DEFAULT-s.jpg"
                ],
                "uniqueId": "T624604"
            },
            {
                "PRODUCT_PRICE": 4.0,
                "PRODUCT_NAME": "Dunlop Logo Tennis Racquet Stencil",
                "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-logo-tennis-racquet-stencil-2217",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1243-DEFAULT-s.jpg"
                ],
                "uniqueId": "T623252"
            }
        ]
    },
    "facets": {
        "text": {
            "list": [
                {
                    "facetName": "MANUFACTURER_uFilter",
                    "filterField": "MANUFACTURER_uFilter",
                    "values": [
                        "BABOLAT",
                        34,
                        "DUNLOP",
                        7,
                        "ADIDAS",
                        6,
                        "GAMMA",
                        2,
                        "CUSHEES",
                        1
                    ],
                    "displayName": "MANUFACTURER",
                    "position": 5
                },
                {
                    "facetName": "DEPARTMENT_uFilter",
                    "filterField": "DEPARTMENT_uFilter",
                    "values": [
                        "strings",
                        29,
                        "accessories",
                        14,
                        "grips",
                        6,
                        "balls",
                        1
                    ],
                    "displayName": "DEPARTMENT",
                    "position": 6
                }
            ]
        },
        "range": {
            "list": [
                {
                    "facetName": "PRODUCT_PRICE",
                    "values": {
                        "counts": [
                            "0.0",
                            38,
                            "25.0",
                            4,
                            "50.0",
                            1,
                            "100.0",
                            3,
                            "150.0",
                            2,
                            "225.0",
                            2
                        ],
                        "gap": 25,
                        "start": 0,
                        "end": 245
                    },
                    "displayName": "PRODUCT_PRICE",
                    "position": 1
                },
                {
                    "facetName": "SHIPPING_WEIGHT",
                    "values": {
                        "counts": [
                            "1.0",
                            41,
                            "2.0",
                            8,
                            "4.0",
                            1
                        ],
                        "gap": 1,
                        "start": 0,
                        "end": 5
                    },
                    "displayName": "SHIPPING_WEIGHT",
                    "position": 3
                }
            ]
        },
        "multilevel": {
            "list": [
                {
                    "values": [
                        {
                            "name": "Sets",
                            "count": 21
                        },
                        {
                            "name": "Reels",
                            "count": 8
                        },
                        {
                            "name": "Wrist & Headbands",
                            "count": 6
                        },
                        {
                            "name": "Racquet Accessories",
                            "count": 4
                        },
                        {
                            "name": "Overgrips",
                            "count": 3
                        }
                    ],
                    "position": 4,
                    "displayName": "SUBCATEGORY",
                    "filterField": "SUBCATEGORY",
                    "level": 1,
                    "breadcrumb": {

                    }
                },
                {
                    "values": [
                        {
                            "name": "strings",
                            "count": 29
                        },
                        {
                            "name": "accessories",
                            "count": 14
                        },
                        {
                            "name": "grips",
                            "count": 6
                        },
                        {
                            "name": "balls",
                            "count": 1
                        }
                    ],
                    "position": 2,
                    "displayName": "CATEGORY",
                    "filterField": "CATEGORY",
                    "level": 1,
                    "breadcrumb": {

                    }
                }
            ]
        }
    }
}
