/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';

export default {
  title: 'SearchBox',
  parameters: {
    props: {
      propTablesExclude: [UnbxdSearchWrapper]
    }
  }
};

const onSubmit = () => {
  console.log('onSubmit ');
  return true;
};

const onClear = () => {
  console.log('onClear ');
  return true;
};

const InputComponent = ({ query, onSearchBoxChange, onSearchBoxClear }) => {
  return (
    <input
      value={query}
      onChange={onSearchBoxChange}
      onClear={onSearchBoxClear}
    />
  );
};

const SubmitComponent = ({ onSearchBoxSubmit }) => {
  return <div onClick={onSearchBoxSubmit}> Submit</div>;
};

const ClearComponent = ({ onSearchBoxClear }) => {
  return <div onClick={onSearchBoxClear}> x </div>;
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchBox />
  </UnbxdSearchWrapper>
);

export const With_Auto_Focus = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchBox autoFocus={true} />
  </UnbxdSearchWrapper>
);

export const With_Clearable = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchBox clearable={true} />
  </UnbxdSearchWrapper>
);

export const With_Callbacks = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchBox onSubmit={onSubmit} onClear={onClear} />
  </UnbxdSearchWrapper>
);

export const With_Custom_Input = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchBox InputComponent={InputComponent} />
  </UnbxdSearchWrapper>
);

export const With_Custom_Search_Button = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchBox SubmitComponent={SubmitComponent} />
  </UnbxdSearchWrapper>
);

export const With_Custom_Clear_Button = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchBox clearable={true} ClearComponent={ClearComponent} />
  </UnbxdSearchWrapper>
);

export const With_Render_Props = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    <SearchBox>
      {() => {
        return <div>Hello SearchBox</div>;
      }}
    </SearchBox>
  </UnbxdSearchWrapper>
);
