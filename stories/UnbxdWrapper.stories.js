import React from 'react';
import UnbxdSearchWrapper from '../src';

import '!style-loader!css-loader!sass-loader!../src/common/styles/index.scss';

export default {
    title: 'UnbxdSearchWrapper'
}

export const UnbxdSearchWrapperComponent = () => (<UnbxdSearchWrapper
    siteName='wildearth-com-au808941566300438'
    siteKey='d36d1fa05b3505ae0d9b06ed91bbe5e4'>
    <p>Hello world</p>
</UnbxdSearchWrapper>)
