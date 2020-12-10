import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import GenerateBanners from './generateBanners';

class BannersContainer extends React.PureComponent {
    getBannerProps() {
        const { unbxdCore, altText, bannerItemComponent } = this.props;
        const banners = unbxdCore.getBanners();

        return { banners, altText, bannerItemComponent };
    }

    render() {
        const DefaultRender = GenerateBanners;

        return conditionalRenderer(
            this.props.children,
            this.getBannerProps(),
            DefaultRender
        );
    }
}

BannersContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    altText: PropTypes.string.isRequired,
    bannerItemComponent: PropTypes.element,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BannersContainer;
