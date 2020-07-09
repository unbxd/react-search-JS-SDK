import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../../components';

const NumberOfProductsList = ({ pageSize, pageSizeOptions, onPageSizeClick, PageSizeItemComponent }) => {

    return (<div className='UNX-pageSize__element'>
        <List
            items={pageSizeOptions}
            activeItem={pageSize}
            ListItem={PageSizeItemComponent}
            onClick={onPageSizeClick}
            className={'UNX-pageSize__list'} />
    </div>)
}

NumberOfProductsList.propTypes = {
    pageSize: PropTypes.number.isRequired,
    pageSizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string }))
        .isRequired,
    onPageSizeClick: PropTypes.func.isRequired,
    PageSizeItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

export default NumberOfProductsList;
