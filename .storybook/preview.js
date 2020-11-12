const { addDecorator } = require('@storybook/react');
const { withPropsTable } = require('storybook-addon-react-docgen');
const { addParameters } = require('@storybook/react');

addDecorator(withPropsTable);

addParameters({
    options: {
        storySort: (a, b) => {
            const rootStoriesOrder = {
                Introduction: 1,
                UnbxdSearchWrapper: 2,
                Products: 3,
                TextFacets: 4,
                RangeFacets: 5,
                MultilevelFacets: 6,
                Breadcrumbs: 7,
                SelectedFacets: 8,
                FacetActions: 9,
                SearchBox: 10,
                PageSize: 11,
                Pagination: 12,
                Sort: 13,
                SpellCheck: 14,
                ViewTypes: 15,
                Banners: 16,
                SearchTitle: 17,
            };

            if (rootStoriesOrder[a[1].kind] < rootStoriesOrder[b[1].kind]) {
                return -1;
            }

            if (rootStoriesOrder[a[1].kind] > rootStoriesOrder[b[1].kind]) {
                return 1;
            }

            return 0;
        },
    },
});
