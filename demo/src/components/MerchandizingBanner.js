import React from 'react';

import { Banners } from '@unbxd-ui/react-search-sdk';

export const BannerItemComponent = ({ itemData }) => {
    const { imageUrl } = itemData;
    return <img src={imageUrl} />;
};

const MerchandizingBanner = () => {
    return <Banners />;
};

export default MerchandizingBanner;
