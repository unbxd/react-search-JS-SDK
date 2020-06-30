import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';
import Banners from '../src/modules/banners';

const stories = storiesOf('Banners', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
});

const BannerItemComponent = ({ itemData }) => {
    const { imageUrl } = itemData;
    return (<img src={imageUrl} />);
}

stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>

    <SearchBox />
    <Banners />

</UnbxdSearchWrapper >));


stories.add('with altText', () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>

    <SearchBox />
    <Banners
        altText='ALT Banner Image' />

</UnbxdSearchWrapper >));

stories.add('with BannerItemComponent', () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>

    <SearchBox />
    <Banners
        BannerItemComponent={BannerItemComponent} />

</UnbxdSearchWrapper >));

stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>

    <SearchBox />
    <Banners>
        {({ data, helpers }) => {

            //data and helpers for Banners
            return (<p>Hello Banners</p>)

        }}
    </Banners>
</UnbxdSearchWrapper >));
