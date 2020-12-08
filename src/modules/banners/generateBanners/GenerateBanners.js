import React from 'react';
import PropTypes from 'prop-types';

import BannerItem from './BannerItem';
import { List } from '../../../components';

const GenerateBanners = (props) => {
    const { banners, altText, bannerItemComponent } = props;

    return (
        <List
            items={banners}
            ListItem={bannerItemComponent || BannerItem}
            idAttribute="imageUrl"
            altText={altText}
            className="UNX-banners__container"
        />
    );
};

GenerateBanners.propTypes = {
    banners: PropTypes.arrayOf(PropTypes.object),
    altText: PropTypes.string.isRequired,
    bannerItemComponent: PropTypes.element
};

export default GenerateBanners;
