import React from 'react';

import { ViewTypes } from '@unbxd-ui/react-search-sdk';

const viewTypes = ['GRID', 'LIST'];


const ProductsViewItemComponent = ({ itemData, isActive, onClick }) => {
    const iconClassName = itemData === "GRID" ? `glyphicon glyphicon-th` : `glyphicon glyphicon-th-list`
    return (<div className='UNX-viewType__wrapper'>
        <a
            className={`${isActive ? '-active' : ''}`}
            data-viewtype={itemData}
            onClick={onClick}>
            <i className={iconClassName} data-viewtype={itemData}></i>
        </a>
    </div>)
}

const ProductViewTypes = ()=>{
    return (<ViewTypes 
        viewTypes={viewTypes}
        displayType={'LIST'}
        ViewItemComponent={ProductsViewItemComponent} />)
}

export default ProductViewTypes;
