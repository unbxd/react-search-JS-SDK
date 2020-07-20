/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import PageSize from '../src/modules/pageSize';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'PageSize',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
  }
};

const defaultSearch = 'dress';

const PageSizeItemComponent = ({ itemData, isActive, onClick }) => {
  return (
    <div
      data-unxpagesize={itemData.id}
      className={`pageSize-item ${isActive ? '-active' : ''}`}
      onClick={onClick}
    >
      {itemData.value}
    </div>
  );
};

const sizeOptions = [
  { id: 5, value: '5' },
  { id: 10, value: '10' },
  { id: 15, value: '15' },
  { id: 20, value: '20' }
];

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <PageSize />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Size = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <PageSize size={5} />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Size_Options = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <PageSize sizeOptions={sizeOptions} />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Display_Type_And_Custom_Component = () => (
  <UnbxdSearchWrapper
    siteKey="demo-unbxd700181503576558"
    apiKey="fb853e3332f2645fac9d71dc63e09ec1"
  >
    <PageSize
      displayType={'LIST'}
      PageSizeItemComponent={PageSizeItemComponent}
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
    <PageSize>
      {() => {
        return <div>Hello PageSize</div>;
      }}
    </PageSize>

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
