import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import SpellCheckContainer from './SpellCheckContainer';

/**
 * Component to manage the view type of products.
 * ViewType supports `GRID` view by default.
 */
const SpellCheck = props => {
  return (
    <AppContextConsumer>
      {appState => {
        if (appState === undefined) {
          hasUnbxdSearchWrapperContext(SpellCheck.displayName);
        }

        const { unbxdCore, unbxdCoreStatus, helpers } = appState;

        return (
          <SpellCheckContainer
            unbxdCore={unbxdCore}
            unbxdCoreStatus={unbxdCoreStatus}
            helpers={helpers}
            {...props}
          />
        );
      }}
    </AppContextConsumer>
  );
};

SpellCheck.displayName = 'SpellCheck';

SpellCheck.propTypes = {
  /**
   * Custom Spell check component
   */
  spellCheckItemComponent: PropTypes.element
};

export default SpellCheck;
