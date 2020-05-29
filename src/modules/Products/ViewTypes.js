import React from 'react';

import { ProductContextConsumer } from './context'

const ViewTypes = () => {
    return (<ProductContextConsumer>{({ isGrid, onViewToggle }) => {

        return (<div className='Unbx-view-types'>
            <div className={`Unbx-view-types grid ${isGrid ? 'active' : ''}`} id='Unbx-grid' onClick={onViewToggle}>
                Grid
        </div>
            <div className={`Unbx-view-types list ${isGrid ? '' : 'active'}`} id='Unbx-list' onClick={onViewToggle}>
                List
        </div>
        </div>)
    }}
    </ProductContextConsumer>)
}

export default ViewTypes;
