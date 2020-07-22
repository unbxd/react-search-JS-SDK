/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Breadcrumbs from '../src/modules/breadcrumbs';
import MultilevelFacets from '../src/modules/multilevelFacets';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'Breadcrumbs',
  parameters: {
    props: {
      propTablesExclude: [
        UnbxdSearchWrapper,
        MultilevelFacets,
        Products,
        SearchBox
      ]
    }
  }
};

const defaultSearch = 'Shoes';

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

const BreadcrumbItemComponent = ({ itemData, onClick }) => {
  const { value, filterField, level } = itemData;
  return (
    <div
      data-unx_categoryname={value}
      data-unx_multilevelfield={filterField}
      data-unx_level={level}
      className={'UNX-breadcrumbs-list-item'}
      onClick={onClick}
    >
      {value} x
    </div>
  );
};

const Root = () => <span>Home</span>;
const separator = <span>-</span>;

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <Breadcrumbs Root={Root} separator={separator} />

    <MultilevelFacets
      categoryDisplayName={'category'}
      categoryField={'categoryPath'}
      defaultCategoryFilter={'All Products'}
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

export const With_Custom_Component = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <Breadcrumbs BreadcrumbItemComponent={BreadcrumbItemComponent} />

    <MultilevelFacets
      categoryDisplayName={'category'}
      categoryField={'categoryPath'}
      defaultCategoryFilter={'All Products'}
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
    <Breadcrumbs>
      {() => {
        return <div>Hello Breadcrumbs</div>;
      }}
    </Breadcrumbs>

    <MultilevelFacets
      categoryDisplayName={'category'}
      categoryField={'categoryPath'}
      defaultCategoryFilter={'All Products'}
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
