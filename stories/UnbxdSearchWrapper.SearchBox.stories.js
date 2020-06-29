import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';

export default {
    title: 'SearchBox',
    component: SearchBox
}

const onSubmit = () => {
    console.log("onSubmit called ");
    return true;
}

const onClear = () => {
    console.log("onClear called ");
    return true;
}

export const SearchBoxComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox
        isAutoFocus={true}
        isClear={true}
        onSubmit={onSubmit}
        onClear={onClear}
    />

</UnbxdSearchWrapper >);


export const SearchBoxWithRenderProps = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox>
        {({ data, helpers }) => {
            const { onQueryChange, handleQuerySubmit } = helpers;
            return (
                <div className='UNX-searchbox-container'>
                    <input className='UNX-searchbox query' onChange={onQueryChange} />
                    <button onClick={handleQuerySubmit}>submit</button>
                </div>
            )
        }}
    </SearchBox>

</UnbxdSearchWrapper >);
