export const bannerSearchResponse = {
    "searchMetaData": {
        "status": 0,
        "queryTime": 17,
        "queryParams": {
            "facet.multiselect": "true",
            "log.response": "false",
            "original.q": "dunlop",
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
            "q": "dunlop",
            "f.categoryPath.max.depth": "6",
            "spellcheck": "true",
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
        "numberOfProducts": 7,
        "start": 0,
        "products": [{
            "PRODUCT_PRICE": 69.95,
            "PRODUCT_NAME": "Dunlop Synthetic Gut 16 Tennis String Reel - White",
            "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-synthetic-gut-16-tennis-string-reel-white-2238",
            "IMAGE_URL": ["https://www.tennisplaza.com/prodimages/1260-DEFAULT-s.jpg"],
            "uniqueId": "T624835"
        }, {
            "PRODUCT_PRICE": 12.0,
            "PRODUCT_NAME": "Dunlop Black Widow 17 Tennis String Set - Black",
            "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-black-widow-17-tennis-string-set-black-2233",
            "IMAGE_URL": ["https://www.tennisplaza.com/prodimages/1255-DEFAULT-s.jpg"],
            "uniqueId": "T624611"
        }, {
            "PRODUCT_PRICE": 12.0,
            "PRODUCT_NAME": "Dunlop Black Widow 16 Tennis String Set - Black",
            "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-black-widow-16-tennis-string-set-black-2232",
            "IMAGE_URL": ["https://www.tennisplaza.com/prodimages/1254-DEFAULT-s.jpg"],
            "uniqueId": "T624610"
        }, {
            "PRODUCT_PRICE": 15.0,
            "PRODUCT_NAME": "Dunlop Silk 16 Tennis String Set - Natural",
            "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-silk-16-tennis-string-set-natural-2231",
            "IMAGE_URL": ["https://www.tennisplaza.com/prodimages/1253-DEFAULT-s.jpg"],
            "uniqueId": "T624604"
        }, {
            "PRODUCT_PRICE": 4.0,
            "PRODUCT_NAME": "Dunlop Logo Tennis Racquet Stencil",
            "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-logo-tennis-racquet-stencil-2217",
            "IMAGE_URL": ["https://www.tennisplaza.com/prodimages/1243-DEFAULT-s.jpg"],
            "uniqueId": "T623252"
        }, {
            "PRODUCT_PRICE": 6.99,
            "PRODUCT_NAME": "Dunlop Gecko-Tac Replacement Grip",
            "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-geckotac-replacement-grip-2213",
            "IMAGE_URL": ["https://www.tennisplaza.com/prodimages/1239-DEFAULT-s.jpg"],
            "uniqueId": "T613177"
        }, {
            "PRODUCT_PRICE": 6.99,
            "PRODUCT_NAME": "Dunlop Gecko-Tac Replacement Grip",
            "PRODUCT_URL": "https://www.tennisplaza.com/dunlop/dunlop-geckotac-replacement-grip-2212",
            "IMAGE_URL": ["https://www.tennisplaza.com/prodimages/3957-DEFAULT-s.jpg"],
            "uniqueId": "T613176"
        }]
    },
    "facets": {
        "text": {
            "list": [{
                "facetName": "MANUFACTURER_uFilter",
                "filterField": "MANUFACTURER_uFilter",
                "values": ["DUNLOP", 7],
                "displayName": "MANUFACTURER",
                "position": 5
            }, {
                "facetName": "DEPARTMENT_uFilter",
                "filterField": "DEPARTMENT_uFilter",
                "values": ["strings", 4, "grips", 2, "accessories", 1],
                "displayName": "DEPARTMENT",
                "position": 6
            }]
        },
        "range": {
            "list": [{
                "facetName": "PRODUCT_PRICE",
                "values": {
                    "counts": ["0.0", 6, "50.0", 1],
                    "gap": 25,
                    "start": 0,
                    "end": 245
                },
                "displayName": "PRODUCT_PRICE",
                "position": 1
            }, {
                "facetName": "SHIPPING_WEIGHT",
                "values": {
                    "counts": ["1.0", 6, "2.0", 1],
                    "gap": 1,
                    "start": 0,
                    "end": 5
                },
                "displayName": "SHIPPING_WEIGHT",
                "position": 3
            }]
        },
        "multilevel": {
            "list": [{
                "values": [{
                    "name": "Sets",
                    "count": 3
                }, {
                    "name": "Replacement",
                    "count": 2
                }, {
                    "name": "Racquet Accessories",
                    "count": 1
                }, {
                    "name": "Reels",
                    "count": 1
                }],
                "position": 4,
                "displayName": "SUBCATEGORY",
                "filterField": "SUBCATEGORY",
                "level": 1,
                "breadcrumb": {}
            }, {
                "values": [{
                    "name": "strings",
                    "count": 4
                }, {
                    "name": "grips",
                    "count": 2
                }, {
                    "name": "accessories",
                    "count": 1
                }],
                "position": 2,
                "displayName": "CATEGORY",
                "filterField": "CATEGORY",
                "level": 1,
                "breadcrumb": {}
            }]
        }
    },
    "banner": {
        "banners": [{
            "imageUrl": "https://dunlopsports.com/wp-content/themes/dunlopsports/assets/img/hero-our-story-large.jpg"
        }]
    }
}