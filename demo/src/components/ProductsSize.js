import React from 'react';

import { PageSize } from '@unbxd-ui/react-search-sdk';


const sizeOptions = [
    { id: 5, value: '5' },
    { id: 10, value: '10' },
    { id: 15, value: '15' },
    { id: 20, value: '20' }
  ];

const label = <div className='-label'>Products per page</div>

const ProductsSize = () => {
    return (<PageSize sizeOptions={sizeOptions} label={label}/>)
}

export default ProductsSize;
