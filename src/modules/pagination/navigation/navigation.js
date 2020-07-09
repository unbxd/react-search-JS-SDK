import React from 'react';

import { Button } from '../../../components';
import { PaginationContextConsumer } from '../context';
import { getPageNavigationOptions } from '../utils'


const Navigation = () => {
    return (<PaginationContextConsumer>
        {({ data, helpers }) => {

            const { currentPage, isNext, isPrev, noOfPages, pagePadding } = data;
            const { onNextPageClick, onPreviousPageClick, onPageClick } = helpers;


            if (noOfPages === 0) {
                return null;
            }

            const activePage = <Button className='UNX-pageNavigation__button -active' data-pagenumber={currentPage} key={currentPage}>
                {currentPage}
            </Button>

            const { prevPages, nextPages } = getPageNavigationOptions(currentPage, pagePadding, noOfPages, Button, onPageClick);

            return (<div className='UNX-pageNavigation__container'>

                {isPrev && <Button className='UNX-pageNavigation__button -action' onClick={onPreviousPageClick} data-pagenumber={currentPage - 1} key={currentPage - 1}>
                    &lt;
            </Button>}

                {prevPages}
                {activePage}
                {nextPages}


                {isNext && <Button className='UNX-pageNavigation__button -action' onClick={onNextPageClick} data-pagenumber={currentPage + 1} key={currentPage + 1}>
                    &gt;
            </Button>}
            </div>)
        }}

    </PaginationContextConsumer>)
}

export default Navigation;
