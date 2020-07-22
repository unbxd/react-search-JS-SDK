import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import BannersContainer from './BannersContainer';

/**
 * Component to display merchandising banners.
 */
const Banners = (props) => {
  return (
    <AppContextConsumer>
      {(appState) => {
        if (appState === undefined) {
          hasUnbxdSearchWrapperContext(Banners.displayName);
        }

        const { unbxdCore, unbxdCoreStatus, helpers, unbxdState } = appState;
        const { enableApplyFilters, selectedFacets } = unbxdState;

        return (
          <BannersContainer
            unbxdCore={unbxdCore}
            unbxdCoreStatus={unbxdCoreStatus}
            helpers={helpers}
            enableApplyFilters={enableApplyFilters}
            selectedFacets={selectedFacets}
            {...props}
          />
        );
      }}
    </AppContextConsumer>
  );
};

Banners.displayName = 'Banners';

Banners.defaultProps = {
  altText: 'banner image'
};

Banners.propTypes = {
  /**
   * Image alt text
   */
  altText: PropTypes.string,
  /**
   * Banner custom component
   */
  BannerItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default Banners;
