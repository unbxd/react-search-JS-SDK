import React from 'react';
import PropTypes from 'prop-types';

import { List } from '../../../components';

const PageSizeList = ({
    size,
    sizeOptions,
    onPageSizeClick,
    PageSizeItemComponent,
}) => {
    return (
        <div className="UNX-pageSize__element">
            <List
                items={sizeOptions}
                ListItem={PageSizeItemComponent}
                onClick={onPageSizeClick}
                className={'UNX-pageSize__list'}
            />
        </div>
    );
};

PageSizeList.propTypes = {
    size: PropTypes.number.isRequired,
    sizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string })
    ).isRequired,
    onPageSizeClick: PropTypes.func.isRequired,
    PageSizeItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]).isRequired,
};

export default PageSizeList;
