import React from 'react';
import Modal from 'react-bootstrap/Modal';

import Sorter from './Sorter';
import TextFilters from './TextFilters';
import RangeFilters from './RangeFilters';
import MultilevelFilters from './MultilevelFilters';
import ProductsSize from './ProductsSize';
import FacetApplyClear from './FacetApplyClear';

const MobileModal = (props) => {
    const { showFilters, handleClose } = props;
    return (
        <Modal
            className="UNX-filterModal UNX-mobileView"
            show={showFilters}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Filter By</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Sorter />
                <ProductsSize />
                <FacetApplyClear handleClose={handleClose} />
                <MultilevelFilters showLabel={false} />
                <RangeFilters />
                <TextFilters />
                <FacetApplyClear handleClose={handleClose} />
            </Modal.Body>
        </Modal>
    );
};

export default MobileModal;
