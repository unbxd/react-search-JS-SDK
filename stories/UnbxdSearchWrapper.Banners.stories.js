import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import SearchBox from '../src/modules/searchBox';
import Banners from '../src/modules/banners';

export default {
    title: 'Banners',
    component: Banners
}

const BannerItemComponent = ({ itemData }) => {
    const { imageUrl } = itemData;
    return (<img src={imageUrl} />);
}

export const BannersComponent = () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>
    <SearchBox />
    <Banners altText='ALT Banner Image' />
</UnbxdSearchWrapper >);


export const BannersCustomComponent = () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>
    <SearchBox />
    <Banners altText='ALT Banner Image' BannerItemComponent={BannerItemComponent} />
</UnbxdSearchWrapper >);


export const BannersRenderProp = () => (<UnbxdSearchWrapper
    siteKey='demo-unbxd700181503576558'
    apiKey='fb853e3332f2645fac9d71dc63e09ec1'>
    <SearchBox />
    <Banners>
        {({ data }) => {
            
            const { banners } = data;

            return banners.map((banner) => {
                const { imageUrl } = banner;
                return (<img src={imageUrl} />)
            })

        }}
    </Banners>
</UnbxdSearchWrapper >);
