/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchTitle from '../src/modules/searchTitle';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'SearchTitle',
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

const SearchTitleItem = props => {
  const { searchQuery, start, productsLn, numberOfProducts } = props;

  return (
    <div>
      Showing results for {searchQuery} - {start + 1} to {start + productsLn} of{' '}
      {numberOfProducts} products
    </div>
  );
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchTitle />

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
    <SearchTitle SearchTitleItem={SearchTitleItem} />

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
    <SearchTitle>
      {() => {
        return <div>Hello SearchTitle</div>;
      }}
    </SearchTitle>

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
