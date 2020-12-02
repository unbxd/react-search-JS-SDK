import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLinks = (props) => {
    const { categoryPathLinks, handleCategoryLinkClick, productType } = props;
    return (
        <div className="UNX-categoryLinks__container">
            <div className="UNX-categoryLink__Header">
                {categoryPathLinks.map(({ path, id, label, isSelected }) => {
                    return (
                        <Link
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
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryLinks;
