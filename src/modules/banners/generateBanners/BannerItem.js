import React from 'react';
import PropTypes from 'prop-types';

const BannerItem = ({ itemData, altText }) => {
    const { imageUrl, landingUrl } = itemData;

    return (
        <a href={landingUrl} className="UNX-banner__item">
            <img alt={altText} className="-item" src={imageUrl} />
        </a>
    );
};

BannerItem.propTypes = {
    itemData: PropTypes.shape({
        imageUrl: PropTypes.string
    }),
    altText: PropTypes.string.isRequired
};

export default BannerItem;
