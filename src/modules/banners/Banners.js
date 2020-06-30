import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../common/context';
import { BannersContextProvider } from './context';
import GenerateBanners from './generateBanners';
import { conditionalRenderer, hasUnbxdSearchWrapperContext } from '../../common/utils';


/**
 * Component to display merchandising banners.
 */
class Banners extends React.Component {

    componentDidMount() {

        if (this.context === undefined) {
            hasUnbxdSearchWrapperContext(Banners.displayName);
        }
    }

    getBannerProps() {

        const { unbxdCore } = this.context;
        const banners = unbxdCore.getBanners();

        const { altText, BannerItemComponent } = this.props;
        const data = { banners, altText }
        const helpers = { BannerItemComponent };

        return { data, helpers };
    }

    render() {
        const DefaultRender = <Fragment>
            <GenerateBanners />
        </Fragment>

        return (<BannersContextProvider value={this.getBannerProps()}>
            {conditionalRenderer(this.props.children, this.getBannerProps(), DefaultRender)}
        </BannersContextProvider>)
    }
}

Banners.contextType = AppContext;
Banners.GenerateBanners = GenerateBanners;
Banners.displayName = "Banners";

Banners.defaultProps = {
    altText: "Banner Image",
}

Banners.propTypes = {
    /**
    * Image alt text
    */
    altText: PropTypes.string,
    /**
    * Banner custom component
    */
    BannerItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default Banners;
