import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLinks = (props) => {
    const { categoryPathLinks, handleCategoryLinkClick, productType } = props;
    return (
        <div className="UNX-categoryLinks__container">
            <div className="UNX-categoryLink__Header">
                {categoryPathLinks.map(({ path, id, label, isSelected }) => {
                    return (
                        <div
                            className={`menu-items ${
                                isSelected && productType === 'CATEGORY'
                                    ? 'active'
                                    : ''
                            }`}
                            data-unx_path={path}
                            key={id}
                            onClick={handleCategoryLinkClick}
                        >
                            <Link
                                className="menu-item-link"
                                data-unx_path={path}
                                to={`/${id}`}
                            >
                                {label}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryLinks;
