/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Sort from '../src/modules/sort';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'Sort',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, Products, SearchBox]
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

const SortItemComponent = ({ itemData, onClick }) => {
  const { value, isSelected = false } = itemData;
  return (
    <div
      data-unxsortby={value}
      className={`sort-item ${isSelected ? '-active' : ''}`}
      onClick={onClick}
    >
      {itemData.label}
    </div>
  );
};

const sortOptions = [
  {
    label: 'Most Popular'
  },
  {
    label: 'Newest',
    field: 'Date_Added',
    order: 'desc'
  },
  {
    label: 'Lowest Price',
    field: 'price',
    order: 'asc'
  },
  {
    label: 'Highest Price',
    field: 'price',
    order: 'desc'
  },
  {
    label: 'Brand A-Z',
    field: 'title',
    order: 'asc'
  },
  {
    label: 'Brand Z-A',
    field: 'title',
    order: 'desc'
  }
];

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <Sort sortOptions={sortOptions} />

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

export const With_Sort_Options = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <Sort defaultSort={sortOptions[4]} sortOptions={sortOptions} />

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

export const With_Display_Type = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <Sort
      default={sortOptions[4]}
      sortOptions={sortOptions}
      displayType={'LIST'}
      SortItemComponent={SortItemComponent}
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
    <Sort sortOptions={sortOptions}>
      {() => {
        return <p>Hello Sort</p>;
      }}
    </Sort>

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
