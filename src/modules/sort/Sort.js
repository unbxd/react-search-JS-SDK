import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';
import SortContainer from './SortContainer';

/**
 * Component to manage the sort.
 */
const Sort = (props) => {
  return (
    <AppContextConsumer>
      {(appState) => {
        if (appState === undefined) {
          hasUnbxdSearchWrapperContext(Sort.displayName);
        }

        const { unbxdCore, unbxdCoreStatus, helpers, unbxdState } = appState;
        const { viewType } = unbxdState;

        return (
          <SortContainer
            unbxdCore={unbxdCore}
            unbxdCoreStatus={unbxdCoreStatus}
            helpers={helpers}
            viewType={viewType}
            {...props}
          />
        );
      }}
    </AppContextConsumer>
  );
};

Sort.displayName = 'Sort';

Sort.defaultProps = {
  defaultSort: {
    label: 'Most relevant'
  },
  displayType: 'DROPDOWN'
};

Sort.propTypes = {
  /**
   * Default sort to be applied on products.
   */
  defaultSort: PropTypes.shape({
    label: PropTypes.string,
    field: PropTypes.string,
    order: PropTypes.string
  }),
  /**
   * Sort options to be applied on products.
   */
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      field: PropTypes.string,
      order: PropTypes.string
    })
  ).isRequired,
  /**
   * `DROPDOWN` | `LIST`
   */
  displayType: PropTypes.string,
  /**
   * Custom sort item component.
   */
  SortItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Label for the component.
   */
  label: PropTypes.node,
  /**
   * Callback for sort change.
   */
  onSortChange: PropTypes.func
};

export default Sort;
