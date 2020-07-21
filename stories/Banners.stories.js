/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Banners from '../src/modules/banners';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'Banners',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
  }
};

const defaultSearch = 'dress';

const BannerItemComponent = ({ itemData }) => {
  const { imageUrl } = itemData;
  return <img src={imageUrl} />;
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <Banners />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_AltText = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <Banners altText="ALT Banner Image" />

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
    <Banners BannerItemComponent={BannerItemComponent} />

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
    <Banners>
      {() => {
        return <p>Hello Banners</p>;
      }}
    </Banners>
    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
