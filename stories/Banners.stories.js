/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Banners from '../src/modules/banners';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'Banners',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, Products, SearchBox]
    }
  }
};

const defaultSearch = 'dress';

const attributesMap = {
  productName: 'title',
  uniqueId: 'uniqueId',
  imageUrl: 'imageUrl',
  price: 'sortPrice',
  productUrl: 'productUrl'
};

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

    <Products attributesMap={attributesMap} />

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

    <Products attributesMap={attributesMap} />

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

    <Products attributesMap={attributesMap} />

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

    <Products attributesMap={attributesMap} />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
