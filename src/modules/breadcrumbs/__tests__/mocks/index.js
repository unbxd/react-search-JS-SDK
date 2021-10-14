export const breadcrumbSearchResponse = {
    "searchMetaData": {
        "status": 0,
        "queryTime": 21,
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
            "rows": "10",
            "version": "V2",
            "enableTaxonomy": "false",
            "f.categoryPath.facet.limit": "100",
            "variants.count": "5",
            "q": "*",
            "f.categoryPath.max.depth": "6",
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
            },
            {
                "PRODUCT_PRICE": 6.99,
                "PRODUCT_NAME": "Dunlop Gecko-Tac Replacement Grip",
                "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-geckotac-replacement-grip-2213",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1239-DEFAULT-s.jpg"
                ],
                "uniqueId": "T613177"
            },
            {
                "PRODUCT_PRICE": 6.99,
                "PRODUCT_NAME": "Dunlop Gecko-Tac Replacement Grip",
                "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-geckotac-replacement-grip-2212",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/3957-DEFAULT-s.jpg"
                ],
                "uniqueId": "T613176"
            },
            {
                "PRODUCT_PRICE": 20.0,
                "PRODUCT_NAME": "Gamma Band It Armband",
                "PRODUCT_URL": "https://www.tennisplaza.com/gamma/gamma-band-it-armband-2777",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/22821-DEFAULT-s.jpg"
                ],
                "uniqueId": "ABI"
            },
            {
                "PRODUCT_PRICE": 15.0,
                "PRODUCT_NAME": "Aircast Tennis Armband - Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/gamma/aircast-tennis-armband-natural-1675",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/792-DEFAULT-s.jpg"
                ],
                "uniqueId": "AACA"
            },
            {
                "PRODUCT_PRICE": 6.95,
                "PRODUCT_NAME": "Babolat Babol Color Black Stencil Ink",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-babol-color-black-stencil-ink-2057",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1140-DEFAULT-s.jpg"
                ],
                "uniqueId": "710010105"
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

export const setsBreadcrumbResponse = {
    "searchMetaData": {
        "status": 0,
        "queryTime": 18,
        "queryParams": {
            "log.response": "false",
            "module.exclude": "personalization",
            "alternate.op": "true",
            "q.op": "AND",
            "variants": "false",
            "f.categoryPath.facet.limit": "100",
            "variants.count": "5",
            "req.rm.promotionEngine": "true",
            "facet.multiselect": "true",
            "original.q": "*",
            "start": "0",
            "req.rm.asterix": "true",
            "rows": "15",
            "version": "V2",
            "enableTaxonomy": "false",
            'category-filter': "Sets",
            "q": "*",
            "f.categoryPath.max.depth": "6",
            "spellcheck": "true",
            "viewType": "GRID",
            "enablePf": "false",
            "user.behaviour": "true",
            "fields": "PRODUCT_NAME,uniqueId,IMAGE_URL,PRODUCT_PRICE,PRODUCT_URL",
            "facet.version": "V2",
            "enablePopularity": "true"
        }
    },
    "response": {
        "numberOfProducts": 21,
        "start": 0,
        "products": [
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
                "PRODUCT_PRICE": 33.95,
                "PRODUCT_NAME": "Babolat RPM Blast 17 + VS 16 Tennis String Set - Black",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-rpm-blast-17-vs-16-tennis-string-set-black-1984",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1072-DEFAULT-s.jpg"
                ],
                "uniqueId": "281034"
            },
            {
                "PRODUCT_PRICE": 18.95,
                "PRODUCT_NAME": "Babolat Pro Hurricane Tour 17 + Xcel 16 Tennis String Set - Gold / Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-pro-hurricane-tour-17-xcel-16-tennis-string-set-gold--natural-1980",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1068-DEFAULT-s.jpg"
                ],
                "uniqueId": "281032100"
            },
            {
                "PRODUCT_PRICE": 32.95,
                "PRODUCT_NAME": "Babolat Pro Hurricane Tour 17 + VS 16 Tennis String Set - Gold / Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-pro-hurricane-tour-17-vs-16-tennis-string-set-gold--natural-1977",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1065-DEFAULT-s.jpg"
                ],
                "uniqueId": "281030100"
            },
            {
                "PRODUCT_PRICE": 11.95,
                "PRODUCT_NAME": "Babolat Addiction 17 Tennis String Set - Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-addiction-17-tennis-string-set-natural-1910",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1001-DEFAULT-s.jpg"
                ],
                "uniqueId": "241115128-17"
            },
            {
                "PRODUCT_PRICE": 11.95,
                "PRODUCT_NAME": "Babolat Addiction 16 Tennis String Set - Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-addiction-16-tennis-string-set-natural-1951",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1041-DEFAULT-s.jpg"
                ],
                "uniqueId": "241115128-16"
            },
            {
                "PRODUCT_PRICE": 19.95,
                "PRODUCT_NAME": "Babolat Xcel French Open 16 Tennis String Set - Black",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-xcel-french-open-16-tennis-string-set-black-1954",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1044-DEFAULT-s.jpg"
                ],
                "uniqueId": "241111105-16"
            },
            {
                "PRODUCT_PRICE": 19.95,
                "PRODUCT_NAME": "Babolat Xcel 17 Tennis String Set - Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-xcel-17-tennis-string-set-natural-1950",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1040-DEFAULT-s.jpg"
                ],
                "uniqueId": "241110128-17"
            },
            {
                "PRODUCT_PRICE": 19.95,
                "PRODUCT_NAME": "Babolat Xcel 16 Tennis String Set - Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-xcel-16-tennis-string-set-natural-1949",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1039-DEFAULT-s.jpg"
                ],
                "uniqueId": "241110128-16"
            },
            {
                "PRODUCT_PRICE": 8.95,
                "PRODUCT_NAME": "Babolat Pro Hurricane 17 Tennis String Set - Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-pro-hurricane-17-tennis-string-set-natural-1948",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1038-DEFAULT-s.jpg"
                ],
                "uniqueId": "241104128-17"
            },
            {
                "PRODUCT_PRICE": 8.95,
                "PRODUCT_NAME": "Babolat Pro Hurricane 16 Tennis String Set - Natural",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-pro-hurricane-16-tennis-string-set-natural-1920",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/4043-DEFAULT-s.jpg"
                ],
                "uniqueId": "241104128-16"
            },
            {
                "PRODUCT_PRICE": 11.95,
                "PRODUCT_NAME": "Babolat Pro Hurricane Tour 17 Tennis String Set - Gold",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-pro-hurricane-tour-17-tennis-string-set-gold-1921",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1011-DEFAULT-s.jpg"
                ],
                "uniqueId": "241102113-17"
            },
            {
                "PRODUCT_PRICE": 11.95,
                "PRODUCT_NAME": "Babolat Pro Hurricane Tour 16 Tennis String Set - Gold",
                "PRODUCT_URL": "https://www.tennisplaza.com/babolat/babolat-pro-hurricane-tour-16-tennis-string-set-gold-1922",
                "IMAGE_URL": [
                    "https://www.tennisplaza.com/prodimages/1012-DEFAULT-s.jpg"
                ],
                "uniqueId": "241102113-16"
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
                        18,
                        "DUNLOP",
                        3
                    ],
                    "displayName": "MANUFACTURER",
                    "position": 5
                },
                {
                    "facetName": "DEPARTMENT_uFilter",
                    "filterField": "DEPARTMENT_uFilter",
                    "values": [
                        "strings",
                        21
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
                            17,
                            "25.0",
                            4
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
                            21
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
                        "filterField": "SUBCATEGORY",
                        "values": [
                            {
                                "name": "Sets"
                            }
                        ],
                        "level": 1
                    }
                },
                {
                    "values": [
                        {
                            "name": "babolat",
                            "count": 10
                        },
                        {
                            "name": "dunlop",
                            "count": 1
                        }
                    ],
                    "position": 2,
                    "displayName": "CATEGORY",
                    "filterField": "CATEGORY",
                    "level": 3,
                    "breadcrumb": {
                        "filterField": "CATEGORY",
                        "values": [
                            {
                                "name": "strings"
                            }
                        ],
                        "child": {
                            "filterField": "CATEGORY",
                            "values": [
                                {
                                    "name": "sets"
                                }
                            ],
                            "level": 2
                        },
                        "level": 1
                    }
                }
            ]
        }
    }
}
