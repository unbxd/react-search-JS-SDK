import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Banners from '../src/modules/banners';
import SearchBox from '../src/modules/searchBox';


const stories = storiesOf('Banners', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper, SearchBox]
    }
});

const defaultSearch = 'dress';

const BannerItemComponent = ({ itemData }) => {
    const { imageUrl } = itemData;
    return (<img src={imageUrl} />);
}

stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>

    <Banners />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));


stories.add('with altText', () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>

    <Banners
        altText='ALT Banner Image' />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with BannerItemComponent', () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>

    <Banners
        BannerItemComponent={BannerItemComponent} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>

    <Banners>
        {({ data, helpers }) => {

            //data and helpers for Banners
            return (<p>Hello Banners</p>)

        }}
    </Banners>
    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));
