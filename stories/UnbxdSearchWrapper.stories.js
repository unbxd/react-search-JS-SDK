import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';

const stories = storiesOf('UnbxdSearchWrapper', module);

const onIntialResultLoad = (unbxdSearchObject) => {
    console.log("onIntialResultLoad", unbxdSearchObject);
}

const onPageLoad = (unbxdSearchObject) => {
    console.log("onPageLoad", unbxdSearchObject);
}

const getCategoryId = () => {

    if (window.UnbxdAnalyticsConf) {
        return encodeURIComponent(window.UnbxdAnalyticsConf["page"]);
    }
}

stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    {/* insert modules here  */}

</UnbxdSearchWrapper >));

stories.add('with callbacks', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'
    onIntialResultLoad={onIntialResultLoad}
    onPageLoad={onPageLoad}>

    {/* insert modules here  */}

</UnbxdSearchWrapper >));

stories.add('with getCategoryId', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'
    getCategoryId={getCategoryId}>

    {/* insert modules here  */}

</UnbxdSearchWrapper >));
