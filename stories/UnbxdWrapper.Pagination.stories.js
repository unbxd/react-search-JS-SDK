import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Pagination from '../src/modules/pagination';

export default {
    title: 'Pagination',
    component: Pagination
}

const PageSizeItemComponent = ({ itemData, isActive }) => {

    return (<div
        data-unxpagesize={itemData.id}
        className={`pageSize-item ${isActive ? 'active' : ''}`}
    >
        {itemData.value}
    </div>)
}

const pageSizeOptions = [{ id: 5, value: "5" }, { id: 10, value: "10" }, { id: 15, value: "15" }, { id: 20, value: "20" }];

export const PaginationComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination
        pageSize={15}
        pageSizeOptions={pageSizeOptions}
        pageSizeDisplayType={'LIST'}
        PageSizeItemComponent={PageSizeItemComponent}
        pagePadding={2} />

</UnbxdSearchWrapper >);

export const PaginationDropdownComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination
        pageSize={15}
        pageSizeOptions={pageSizeOptions}
        pageSizeDisplayType={'DROPDOWN'}
        PageSizeItemComponent={PageSizeItemComponent}
        pagePadding={2} />

</UnbxdSearchWrapper >);

export const PaginationRenderProps = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Pagination
        pageSize={15}
        pageSizeOptions={pageSizeOptions}
    >
        {({ data, helpers }) => {
            //data and helpers for Pagination
            return (<p>Hello from Pagination</p>)
        }}
    </Pagination>

</UnbxdSearchWrapper >)  
