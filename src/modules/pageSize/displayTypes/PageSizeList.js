import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../components';

const PageSizeList = ({
    sizeOptions,
    onPageSizeClick,
    pageSizeItemComponent
}) => {
    return (
        <div className="UNX-pageSize__element">
            <List
                items={sizeOptions}
                ListItem={pageSizeItemComponent}
                onClick={onPageSizeClick}
                className="UNX-pageSize__list"
            />
        </div>
    );
};

PageSizeList.propTypes = {
    sizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string })
    ).isRequired,
    onPageSizeClick: PropTypes.func.isRequired,
    pageSizeItemComponent: PropTypes.element.isRequired
};

export default PageSizeList;
