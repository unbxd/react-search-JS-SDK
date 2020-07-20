import React from 'react';
import PropTypes from 'prop-types';


import BannerItem from './BannerItem';
import { List } from '../../../components';


const GenerateBanners = (props) => {

    const { banners, altText ,BannerItemComponent } = props;
    
            return (<List
                items={banners}
                ListItem={BannerItemComponent || BannerItem}
                idAttribute={'imageUrl'}
                altText={altText}
                className='UNX-banners__container' />);

}

GenerateBanners.propTypes = {
    banners: PropTypes.arrayOf(PropTypes.object),  
    altText:PropTypes.string.isRequired,
    BannerItemComponent:PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default GenerateBanners;
