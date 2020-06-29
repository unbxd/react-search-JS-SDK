import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Pagination from '../src/modules/pagination';


const stories = storiesOf('Pagination', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper]
    }
});

const PageSizeItemComponent = ({ itemData, isActive }) => {

    return (<div
        data-unxpagesize={itemData.id}
        className={`pageSize-item ${isActive ? 'active' : ''}`}
    >
        {itemData.value}
    </div>)
}

const pageSizeOptions = [
    { id: 5, value: "5" },
    { id: 10, value: "10" },
    { id: 15, value: "15" },
    { id: 20, value: "20" }
];

stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination />

</UnbxdSearchWrapper >));

stories.add('with pageSize', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination pageSize={15} />

</UnbxdSearchWrapper >));

stories.add('with pageSizeOptions', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination pageSizeOptions={pageSizeOptions} />

</UnbxdSearchWrapper >));

stories.add('with pageSizeDisplayType Dropdown', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination pageSizeDisplayType={'DROPDOWN'} />

</UnbxdSearchWrapper >));

stories.add('with pageSizeDisplayType List', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination
        pageSizeDisplayType={'LIST'}
        PageSizeItemComponent={PageSizeItemComponent}
    />

</UnbxdSearchWrapper >));

stories.add('with pagePadding', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination pagePadding={3} />

</UnbxdSearchWrapper >));

stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination
        pageSize={15}
        pageSizeOptions={pageSizeOptions}
    >
        {({ data, helpers }) => {
            //data and helpers for Pagination
            return (<p>Hello Pagination</p>)
        }}
    </Pagination>

</UnbxdSearchWrapper >));  
