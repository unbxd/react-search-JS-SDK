/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import RangeFacets from '../src/modules/rangeFacets';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'RangeFacets',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
  }
};

const defaultSearch = 'dress';

const FacetSliderItemComponent = () => {
  return <div>Facet FacetSliderItemComponent</div>;
};

const FacetListItemComponent = () => {
  return <div>Facet coFacetListItemComponentmponent</div>;
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <RangeFacets />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Custom_Slider_Component = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <RangeFacets FacetSliderItemComponent={FacetSliderItemComponent} />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Display_Type = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <RangeFacets displayType={'LIST'} />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Custom_List_Component = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <RangeFacets
      displayType={'LIST'}
      FacetListItemComponent={FacetListItemComponent}
    />

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
    <RangeFacets>
      {() => {
        return <div>Hello RangeFacets</div>;
      }}
    </RangeFacets>

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
