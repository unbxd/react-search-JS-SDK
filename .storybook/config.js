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
        SearchBox: 9,
        PageSize: 10,
        Pagination: 11,
        Sort: 12,
        SpellCheck: 13,
        ViewTypes: 14,
        Banners: 15,
        SearchTitle: 16
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
