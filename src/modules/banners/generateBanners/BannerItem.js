import React from 'react';
import PropTypes from 'prop-types';

const BannerItem = ({ itemData, altText }) => {

    const { imageUrl } = itemData;

    return (<div className='UNX-banner-item'>
        <img alt={altText} className='UNX-banner-item image' src={imageUrl} />
    </div>);
}

BannerItem.propTypes = {
    itemData: PropTypes.shape({
        imageUrl: PropTypes.string
    }),
    altText: PropTypes.string.isRequired
}

export default BannerItem;
