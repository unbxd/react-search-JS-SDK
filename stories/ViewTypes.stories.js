/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import ViewTypes from '../src/modules/viewTypes';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'ViewTypes',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, Products, SearchBox]
    }
  }
};

const defaultSearch = 'rde shirt';

const attributesMap = {
  productName: 'title',
  uniqueId: 'uniqueId',
  imageUrl: 'imageUrl',
  price: 'min_cheapest_default_price',
  productUrl: 'productUrl'
};

const variantAttributesMap = {
  productName: 'title',
  uniqueId: 'variantId',
  imageUrl: 'imageUrl',
  price: 'v_unbxd_price'
};

const ViewItemComponent = ({ itemData, isActive, onClick }) => {
  return (
    <div className="UNX-viewType__wrapper">
      <p
        data-viewtype={itemData}
        className={`${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        {itemData}
      </p>
    </div>
  );
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <ViewTypes />

    <Products
      attributesMap={attributesMap}
      showVariants={true}
      variantAttributesMap={variantAttributesMap}
    />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_View_Types = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <ViewTypes viewTypes={['GRID', 'LIST']} />

    <Products
      attributesMap={attributesMap}
      showVariants={true}
      variantAttributesMap={variantAttributesMap}
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
    <ViewTypes
      viewTypes={['GRID', 'LIST']}
      displayType={'LIST'}
      ViewItemComponent={ViewItemComponent}
    />

    <Products
      attributesMap={attributesMap}
      showVariants={true}
      variantAttributesMap={variantAttributesMap}
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
    <ViewTypes viewTypes={['GRID', 'LIST']} displayType={'LIST'}>
      {data => {
        console.log(data);
        return <div>Hello from ViewTypes</div>;
      }}
    </ViewTypes>

    <Products
      attributesMap={attributesMap}
      showVariants={true}
      variantAttributesMap={variantAttributesMap}
    />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
