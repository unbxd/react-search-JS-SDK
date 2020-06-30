import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';
import SpellCheck from '../src/modules/spellCheck';

const stories = storiesOf('SpellCheck', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper,
            'SearchBox']
    }
});


const SpellCheckItemComponent = ({ itemData, onClick }) => {
    const { suggestion } = itemData;
    return (<p data-suggestion={suggestion} onClick={onClick}>Were you looking for {suggestion}</p>)
}


stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />
    <SpellCheck />

</UnbxdSearchWrapper >));

stories.add('with SpellCheckItemComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />
    <SpellCheck
        SpellCheckItemComponent={SpellCheckItemComponent} />

</UnbxdSearchWrapper >));


stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />
    <SpellCheck>
        {({ data, helpers }) => {

            //data and helpers for SpellCheck
            return (<div>Hello SpellCheck</div>)
        }}
    </SpellCheck>
</UnbxdSearchWrapper >));
