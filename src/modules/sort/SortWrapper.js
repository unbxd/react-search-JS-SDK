import React from 'react';
import PropTypes from 'prop-types';

import { SortByDropdown, SortByList } from './displayTypes';
import { displayTypes } from '../../config';

const SortWrapper = props => {
  const {
    sortOptions: sortByOptions,
    displayType,
    sortBy,
    noOfPages,
    onSortClick,
    SortItemComponent,
    label
  } = props;

  if (!(Array.isArray(sortByOptions) && sortByOptions.length)) {
    return null;
  }

  if (noOfPages === 0) {
    return null;
  }

  return (
    <div className="UNX-sortby__container">
      {label?label:null}
      {displayType === displayTypes.DROPDOWN && (
        <SortByDropdown
          sortBy={sortBy}
          sortByOptions={sortByOptions}
          onSortClick={onSortClick}
        />
      )}

      {displayType === displayTypes.LIST && (
        <SortByList
          sortByOptions={sortByOptions}
          onSortClick={onSortClick}
          SortItemComponent={SortItemComponent}
        />
      )}
    </div>
  );
};

SortWrapper.propTypes = {
  sortBy: PropTypes.object,
  noOfPages: PropTypes.number.isRequired,
  onSortClick: PropTypes.func.isRequired,
  defaultSort: PropTypes.shape({
    label: PropTypes.string,
    field: PropTypes.string,
    order: PropTypes.string
  }),
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      field: PropTypes.string,
      order: PropTypes.string
    })
  ).isRequired,
  displayType: PropTypes.string,
  SortItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  label:PropTypes.node
};

export default SortWrapper;
