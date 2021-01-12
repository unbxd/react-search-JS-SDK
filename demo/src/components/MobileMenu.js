import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

const MobileMenu = (props) => {
    const {
        categoryPathLinks,
        handleCategoryLinkClick,
        handleShow,
        productType,
        enableFilters
    } = props;
    return (
        <div className="UNX-mobileMenu UNX-mobileView">
            <Dropdown className="UNX-categoryLink__dropdown">
                <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    size="md"
                >
                    Menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {categoryPathLinks.map(
                        ({ path, id, label, isSelected }) => {
                            return (
                                <Dropdown.Item
                                    as={Link}
                                    className={`menu-items ${
                                        isSelected && productType === 'CATEGORY'
                                            ? 'active'
                                            : ''
                                    }`}
                                    to={`/${id}`}
                                    data-unx_path={path}
                                    key={id}
                                    onClick={handleCategoryLinkClick}
                                >
                                    {label}
                                </Dropdown.Item>
                            );
                        }
                    )}
                </Dropdown.Menu>
            </Dropdown>

            {enableFilters && (
                <div className="UNX-fiterIcon" onClick={handleShow}>
                    <i className="fa fa-filter" aria-hidden="true" />
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
