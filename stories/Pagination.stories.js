/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Pagination from '../src/modules/pagination';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'Pagination',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
  }
};

const defaultSearch = 'Boots';

const PaginationItemComponent = props => {
  const { pagenumber, onClick, label, type } = props;
  return (
    <div
      data-pagenumber={pagenumber}
      onClick={onClick ? onClick : null}
      className={`UNX-pageNavigation__button ${type ? '-action' : ''}`}
    >
      {type === 'NUMBER' && <span>{label}</span>}
      {type === 'PREVIOUS' && <span>&lt;</span>}
      {type === 'NEXT' && <span>&gt;</span>}
    </div>
  );
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <Pagination />

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);

export const With_Padding = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <Pagination padding={3} />

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
    <Pagination PaginationItemComponent={PaginationItemComponent} />

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
    <Pagination>
      {() => {
        return <p>Hello Pagination</p>;
      }}
    </Pagination>

    <div className="hidden">
      <SearchBox defaultSearch={defaultSearch} />
    </div>
  </UnbxdSearchWrapper>
);
