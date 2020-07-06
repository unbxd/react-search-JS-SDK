import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SpellCheck from '../src/modules/spellCheck';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';


const stories = storiesOf('SpellCheck', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper,
            'SearchBox']
    }
});

const defaultSearch = 'rde shirt';

const attributesMap = {
    productName: "title",
    uniqueId: "uniqueId",
    imageUrl: "imageUrl",
    price: "min_cheapest_default_price",
    productUrl: "productUrl"
}

const variantAttributesMap = {
    productName: "title",
    uniqueId: "variantId",
    imageUrl: "imageUrl",
    price: "v_unbxd_price",
}

const SpellCheckItemComponent = ({ itemData, onClick }) => {
    const { suggestion } = itemData;
    return (<p
        data-suggestion={suggestion}
        onClick={onClick}>Were you looking for {suggestion}</p>)
}


stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SpellCheck />

    <Products
        attributesMap={attributesMap}
        showVariants={true}
        variantAttributesMap={variantAttributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with SpellCheckItemComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SpellCheck
        SpellCheckItemComponent={SpellCheckItemComponent} />

    <Products
        attributesMap={attributesMap}
        showVariants={true}
        variantAttributesMap={variantAttributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));


stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SpellCheck>
        {({ data, helpers }) => {

            //data and helpers for SpellCheck
            return (<div>Hello SpellCheck</div>)
        }}
    </SpellCheck>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));
