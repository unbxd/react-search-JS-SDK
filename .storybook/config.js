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
                Facets: 4,
                Pagination: 5,
                Sort: 6,
                SearchBox: 7,
                SpellCheck: 8,
                Banners: 9,
            }

            if (rootStoriesOrder[a[1].kind] < rootStoriesOrder[b[1].kind]) {
                return -1;
            }

            if (rootStoriesOrder[a[1].kind] > rootStoriesOrder[b[1].kind]) {
                return 1;
            }

            return 0;
        }

    },
});
