import React from 'react';

import { SortContextConsumer } from '../context';
import { SortByDropdown, SortByList } from './displayTypes';
import { sortDisplayTypes } from '../utils';

const SortBy = () => {

    return (<SortContextConsumer>
        {({ data, helpers }) => {

            const { sortOptions: sortByOptions, sortDisplayType, sortBy,noOfPages } = data;
            const { onSortClick, SortItemComponent } = helpers;

            if (!(Array.isArray(sortByOptions) && sortByOptions.length)) {
                return null;
            }

            if (noOfPages === 0) {
                return null;
            }


            //Decide which DisplayType we using
            return (
                <div className='UNX-sortby__container'>
                    {
                        sortDisplayType === sortDisplayTypes.DROPDOWN &&
                        <SortByDropdown
                            sortBy={sortBy}
                            sortByOptions={sortByOptions}
                            onSortClick={onSortClick}
                        />
                    }

                    {
                        sortDisplayType === sortDisplayTypes.LIST &&
                        <SortByList
                            sortBy={sortBy}
                            sortByOptions={sortByOptions}
                            onSortClick={onSortClick}
                            SortItemComponent={SortItemComponent}
                        />
                    }
                </div>)
        }}

    </SortContextConsumer>)
}

export default SortBy;
