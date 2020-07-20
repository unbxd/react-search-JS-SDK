/* eslint react/prop-types: 0 */
import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';

export default {
  title: 'UnbxdSearchWrapper'
};

const onIntialResultLoad = unbxdSearchObject => {
  console.log('onIntialResultLoad', unbxdSearchObject);
};

const onPageLoad = unbxdSearchObject => {
  console.log('onPageLoad', unbxdSearchObject);
};

const getCategoryId = () => {
  if (window.UnbxdAnalyticsConf) {
    return encodeURIComponent(window.UnbxdAnalyticsConf['page']);
  }
};

export const Default = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
  >
    {/* insert modules here  */}
  </UnbxdSearchWrapper>
);

export const With_Callbacks = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
    onIntialResultLoad={onIntialResultLoad}
    onPageLoad={onPageLoad}
  >
    {/* insert modules here  */}
  </UnbxdSearchWrapper>
);

export const with_Category_Id = () => (
  <UnbxdSearchWrapper
    siteKey="wildearthclone-neto-com-au808941566310465"
    apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
    getCategoryId={getCategoryId}
  >
    {/* insert modules here  */}
  </UnbxdSearchWrapper>
);
