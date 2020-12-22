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
                CombinedFacets: 7,
                Breadcrumbs: 8,
                SelectedFacets: 9,
                FacetActions: 10,
                SearchBox: 11,
                PageSize: 12,
                Pagination: 13,
                Sort: 14,
                SpellCheck: 15,
                ViewTypes: 16,
                Banners: 17,
                SearchTitle: 18
            };

            if (rootStoriesOrder[a[1].kind] < rootStoriesOrder[b[1].kind]) {
                return -1;
            }

            if (rootStoriesOrder[a[1].kind] > rootStoriesOrder[b[1].kind]) {
                return 1;
            }

            return 0;
        }
    }
});
