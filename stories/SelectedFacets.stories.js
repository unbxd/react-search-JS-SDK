/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SelectedFacets from '../src/modules/selectedFacets';
import TextFacets from '../src/modules/textFacets';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'SelectedFacets',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, TextFacets, Products, SearchBox]
    }
  }
};

const defaultSearch = 'Boots';

const attributesMap = {
  productName: 'title',
  uniqueId: 'uniqueId',
  imageUrl: 'imageUrl',
  price: 'unbxd_price',
  productUrl: 'productUrl'
};

const variantAttributesMap = {
  productName: 'title',
  uniqueId: 'vId',
  imageUrl: 'imageUrl',
  price: 'v_unbxd_price',
  productUrl: 'productUrl'
};

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
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SelectedFacets />
    <TextFacets />
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
    <SelectedFacets FacetItemComponent={FacetItemComponent} />

    <TextFacets />

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
    <SelectedFacets>
      {() => {
        return <div>Hello SelectedFacets</div>;
      }}
    </SelectedFacets>

    <TextFacets />

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
