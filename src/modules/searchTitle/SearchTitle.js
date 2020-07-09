import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../common/context';
import GenerateSearchTitle from './GenerateSearchTitle';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';

const SearchTitle = (props) => {
    return (<AppContextConsumer>
        {(state) => {

            if (state === undefined) {
                hasUnbxdSearchWrapperContext(Banners.displayName);
            }
            const { unbxdCore, } = state;
            const { SearchTitleItem } = props;

            const searchQuery = unbxdCore.getSearchQuery() || '';
            const paginationInfo = unbxdCore.getPaginationInfo() || {};

            const getSearchTitleProps = () => {
                const data = { searchQuery, paginationInfo };
                const helpers = {};

                return { data, helpers };
            }

            return (SearchTitleItem ?
                <SearchTitleItem {...getSearchTitleProps()} /> :
                <GenerateSearchTitle {...getSearchTitleProps()} />)
        }}
    </AppContextConsumer>)
}

SearchTitle.displayName = 'SearchTitle';

SearchTitle.propTypes = {
    SearchTitleItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default SearchTitle;
