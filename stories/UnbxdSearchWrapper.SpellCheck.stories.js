import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';
import SpellCheck from '../src/modules/spellCheck';

export default {
    title: 'SpellCheck',
    component: SpellCheck
}


const SpellCheckItemComponent = ({ itemData, onClick }) => {
    const { suggestion } = itemData;
    return (<p data-suggestion={suggestion} onClick={onClick}>Were you looking for {suggestion}</p>)
}


export const SpellCheckComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />
    <SpellCheck />

</UnbxdSearchWrapper >);

export const SpellCheckCustomComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />
    <SpellCheck SpellCheckItemComponent={SpellCheckItemComponent} />

</UnbxdSearchWrapper >);


export const SpellCheckWithRenderProps = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />
    <SpellCheck>
        {({data, helpers}) => {

            debugger
            const { spellChecks } = data;
            const { onSuggestionClick } = helpers;

            return (spellChecks.map((suggestionObject) => {
                const { suggestion, frequency } = suggestionObject;
                return (<div data-suggestion={suggestion} onClick={onSuggestionClick}>
                    Did you mean - {suggestion}
                    <div className='pill'>
                        {frequency}
                    </div></div>)
            }))
        }}
    </SpellCheck>


</UnbxdSearchWrapper >);
