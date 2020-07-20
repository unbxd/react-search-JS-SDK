/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import TextFacets from '../src/modules/textFacets';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'TextFacets',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
  }
};

const defaultSearch = 'boots';

const FacetItemComponent = ({
  itemData,
  facetName,
  onClick,
  isFacetSelected,
  selectedFacets
}) => {
  const { name, count, dataId } = itemData;
  const isSelected = isFacetSelected(selectedFacets, facetName, dataId);

  return (
    <div>
      <input
        type="checkbox"
        checked={isSelected}
        data-unx_name={facetName}
        data-unx_dataid={dataId}
        onClick={onClick}
      />
      {name} - {count}
    </div>
  );
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <TextFacets />

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
    <TextFacets FacetItemComponent={FacetItemComponent} />

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
    <TextFacets>
      {() => {
        return <div>Hello from TextFacets render props</div>;
      }}
    </TextFacets>

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
