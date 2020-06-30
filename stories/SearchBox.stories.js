import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';

const stories = storiesOf('SearchBox', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper]
    }
});

const onSubmit = () => {
    console.log("onSubmit ");
    return true;
}

const onClear = () => {
    console.log("onClear ");
    return true;
}

const LoaderComponent = () => {
    return (<div>Loading..</div>)
}

stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />

</UnbxdSearchWrapper >));

stories.add('with autoFocus', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox
        autoFocus={true} />

</UnbxdSearchWrapper >));

stories.add('with clearable', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox
        clearable={true} />

</UnbxdSearchWrapper >));

stories.add('with callbacks', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox
        onSubmit={onSubmit}
        onClear={onClear} />

</UnbxdSearchWrapper >));

stories.add('with loader', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox
        showLoader={true}
        LoaderComponent={LoaderComponent} />

</UnbxdSearchWrapper >));

stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox>
        {({ data, helpers }) => {

            //data and helpers for SearchBox
            return (<div>Hello SearchBox</div>)
        }}
    </SearchBox>

</UnbxdSearchWrapper >));
