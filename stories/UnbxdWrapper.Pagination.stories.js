import React from 'react';

import UnbxdSearchWrapper from '../src/App';
import Pagination from '../src/modules/pagination';

export default {
    title: 'UnbxdSearchWrapper'
}

const MyListComponent = ({ itemData, onClick, isActive }) => {

    return (<div data-unxpagesize={itemData.id}>{itemData.value}</div>)
}

export const UnbxdSearchWrapperPaginationComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>
    <Pagination
        pageSize={15}
        pageSizeOptions={[{ id: 5, value: "5" }, { id: 10, value: "10" }, { id: 15, value: "15" }, { id: 20, value: "20" }]}
        pageSizeDisplayType={'LIST'}
        PageSizeListComponent={MyListComponent}
        pagePadding={2} />

</UnbxdSearchWrapper >)  
