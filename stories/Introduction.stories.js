/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';
import Products from '../src/modules/products';
import Pagination from '../src/modules/pagination';
import PageSize from '../src/modules/pageSize';
import Sort from '../src/modules/sort';
import TextFacets from '../src/modules/textFacets';
import RangeFacets from '../src/modules/rangeFacets';
import MultilevelFacets from '../src/modules/multilevelFacets';
import FacetActions from '../src/modules/facetActions';
import Breadcrumbs from '../src/modules/breadcrumbs';
import SelectedFacets from '../src/modules/selectedFacets';
import Banners from '../src/modules/banners';
import SpellCheck from '../src/modules/spellCheck';
import ViewTypes from '../src/modules/viewTypes';
import SearchTitle from '../src/modules/searchTitle';

export default {
  title: 'Introduction',
  parameters: {
    props: {
      propTablesExclude: [
        SearchBox,
        Products,
        Pagination,
        Sort,
        TextFacets,
        Banners,
        SpellCheck
      ]
    }
  }
};

const attributesMap = {
  productName: 'title',
  uniqueId: 'uniqueId',
  imageUrl: 'imageUrl',
  price: 'RRP_Price',
  sellingPrice: 'unbxd_price',
  productUrl: 'productUrl'
};

const variantAttributesMap = {
  productName: 'v_title',
  uniqueId: 'vId',
  imageUrl: 'v_imageUrl',
  price: 'v_RRP_Price',
  sellingPrice: 'v_unbxd_price'
};

const getCategoryId = () => {
  if (window.UnbxdAnalyticsConf) {
    return encodeURIComponent(window.UnbxdAnalyticsConf['page']);
  }
};

const pageSizeOptions = [
  {
    id: 5,
    value: '5'
  },
  {
    id: 10,
    value: '10'
  },
  {
    id: 15,
    value: '15'
  },
  {
    id: 20,
    value: '20'
  }
];

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

const Root = () => <span>Home</span>;
const separator = <span>-</span>;

const ApplyFilter = ({ onApplyFilter }) => (
  <div onClick={onApplyFilter}>Apply</div>
);
const ClearFilter = ({ onClearFilter }) => (
  <div onClick={onClearFilter}>Clear</div>
);

export const Search = () => (
  <UnbxdSearchWrapper
    siteKey="wildearth-com-au808941566300438"
    apiKey="d36d1fa05b3505ae0d9b06ed91bbe5e4"
    priceUnit="$"
  >
    <SearchBox />

    <SpellCheck />

    <SearchTitle />

    <Banners altText="alt banner image" />

    <Breadcrumbs Root={Root} separator={separator} />

    <SelectedFacets />

    <PageSize size={15} sizeOptions={pageSizeOptions} />

    <Pagination />

    <Sort
      default={{
        label: 'Brand A-Z',
        field: 'title',
        order: 'asc'
      }}
      sortOptions={sortOptions}
    />

    <MultilevelFacets
      categoryDisplayName={'category'}
      categoryField={'categoryPath'}
      defaultCategoryFilter={'All Products'}
      facetDepth={6}
      facetLimit={100}
    />

    <TextFacets />

    <RangeFacets displayType={'LIST'} />

    <FacetActions
      ApplyFilterComponent={ApplyFilter}
      ClearFilterComponent={ClearFilter}
    />

    <ViewTypes viewTypes={['GRID', 'LIST']} />

    <Products
      paginationType={'INFINITE_SCROLL'}
      perRow={3}
      pageSize={20}
      productViewTypes={['GRID', 'LIST']}
      attributesMap={attributesMap}
      showVariants={true}
      variantsCount={2}
      variantAttributesMap={variantAttributesMap}
    />
  </UnbxdSearchWrapper>
);

export const Category = () => {
  //explicitly setting the UnbxdAnalyticsConf
  window.UnbxdAnalyticsConf = {
    '0': 'l',
    '1': 'i',
    '2': 'g',
    '3': 'h',
    '4': 't',
    page: 'All Products>Boots',
    page_type: 'CATEGORY_PATH'
  };

  return (
    <UnbxdSearchWrapper
      siteKey="wildearthclone-neto-com-au808941566310465"
      apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
      getCategoryId={getCategoryId}
      productType={'CATEGORY'}
    >
      <SearchBox />

      <Products
        paginationType={'FIXED_PAGINATION'}
        perRow={3}
        pageSize={20}
        productViewTypes={['GRID', 'LIST']}
        attributesMap={attributesMap}
        showVariants={true}
        variantsCount={2}
        variantAttributesMap={variantAttributesMap}
      />
    </UnbxdSearchWrapper>
  );
};
