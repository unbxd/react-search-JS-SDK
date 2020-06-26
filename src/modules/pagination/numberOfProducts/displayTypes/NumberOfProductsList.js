import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../../components';

const NumberOfProductsList = ({ pageSize, pageSizeOptions, onPageSizeClick, PageSizeListComponent }) => {

    return (<div className='UNX-pagesize-list'>
        <List
            items={pageSizeOptions}
            activeItem={pageSize}
            ListItem={PageSizeListComponent}
            onClick={onPageSizeClick}
            className={'UNX-pagesize-list-container'} />
    </div>)
}

NumberOfProductsList.propTypes = {
    pageSize: PropTypes.number.isRequired,
    pageSizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string }))
        .isRequired,
    onPageSizeClick: PropTypes.func.isRequired,
    PageSizeListComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

export default NumberOfProductsList;
