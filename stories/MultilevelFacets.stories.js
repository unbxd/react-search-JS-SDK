/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import MultilevelFacets from '../src/modules/multilevelFacets';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'MultilevelFacets',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
  }
};

const defaultSearch = 'boots';

const FacetItemComponent = ({ itemData, multiLevelField, level, onClick }) => {
  const { name, count } = itemData;
  return (
    <div
      data-unx_categoryname={name}
      data-unx_multilevelfield={multiLevelField}
      data-unx_level={level}
      className="UNX-bucketed-facet-list-item"
      onClick={onClick}
    >
      {name} - {count}
    </div>
  );
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <MultilevelFacets
      categoryDisplayName={'category'}
      categoryField={'categoryPath'}
    />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Default_Category_Filter = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <MultilevelFacets
      categoryDisplayName={'category'}
      categoryField={'categoryPath'}
      defaultCategoryFilter={'All Products'}
    />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Custom_Component = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <MultilevelFacets
      categoryDisplayName={'category'}
      categoryField={'categoryPath'}
      FacetItemComponent={FacetItemComponent}
    />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Render_Props = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <MultilevelFacets
      categoryDisplayName={'category'}
      categoryField={'categoryPath'}
    >
      {() => {
        return <div>Hello MultilevelFacets</div>;
      }}
    </MultilevelFacets>

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
