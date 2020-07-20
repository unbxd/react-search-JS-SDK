/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SelectedFacets from '../src/modules/selectedFacets';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'SelectedFacets',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
  }
};

const defaultSearch = 'dress';

const FacetItemComponent = ({ itemData, facetName, onClick }) => {
  const { name, dataId } = itemData;
  return (
    <div data-unx_name={facetName} data-unx_dataid={dataId} onClick={onClick}>
      {name} x
    </div>
  );
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <SelectedFacets />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Custom_Component = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <SelectedFacets FacetItemComponent={FacetItemComponent} />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Render_Props = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <SelectedFacets>
      {() => {
        return <div>Hello SelectedFacets</div>;
      }}
    </SelectedFacets>

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
