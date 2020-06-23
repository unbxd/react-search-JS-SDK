import React from 'react';

import { BannersContextConsumer } from '../context';
import BannerItem from './BannerItem';
import { List } from '../../../components';


const GenerateBanners = () => {

    return (<BannersContextConsumer>
        {({ data, helpers }) => {

            const { banners, altText } = data;
            const { BannerItemComponent } = helpers;
            return (<List
                items={banners}
                ListItem={BannerItemComponent || BannerItem}
                idAttribute={'imageUrl'}
                altText={altText}
                className='UNX-banner-list-container' />);
        }}
    </BannersContextConsumer>)


}

export default GenerateBanners;
