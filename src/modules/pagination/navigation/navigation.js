import React from 'react';

import { Button } from '../../../components';
import { PaginationContextConsumer } from '../context';
import { getPageNavigationOptions } from '../utils'


const Navigation = () => {
    return (<PaginationContextConsumer>
        {({ data, helpers }) => {

            const { currentPage, isNext, isPrev, noOfPages } = data;
            const { onNextPageClick, onPreviousPageClick, onPageClick } = helpers;


            if (noOfPages === 0) {
                return null;
            }

            const activePage = <Button className='UNX-page-navigation button active' data-pagenumber={currentPage} key={currentPage}>
                {currentPage}
            </Button>

            const { prevPages, nextPages } = getPageNavigationOptions(currentPage, 3, noOfPages, Button, onPageClick);

            return (<div className='UBX-page-navigation-container'>

                {isPrev && <Button className='UNX-page-navigation button action' onClick={onPreviousPageClick} data-pagenumber={currentPage - 1} key={currentPage - 1}>
                    Previous
            </Button>}

                {prevPages}
                {activePage}
                {nextPages}


                {isNext && <Button className='UNX-page-navigation button action' onClick={onNextPageClick} data-pagenumber={currentPage + 1} key={currentPage + 1}>
                    Next
            </Button>}
            </div>)
        }}

    </PaginationContextConsumer>)
}

export default Navigation;
