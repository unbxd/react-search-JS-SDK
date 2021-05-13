import React from 'react';

const ViewMore = ({ facetName, toggleViewLess, viewLess, ...props }) => {
    return !viewLess ? (
        <div
            className="view-More"
            data-unx_name={facetName}
            onClick={toggleViewLess}
            aria-label="view less facets"
            tabIndex={0}
            role={'button'}
        >
            View Less
        </div>
    ) : (
        <div
            className="view-More"
            data-unx_name={facetName}
            onClick={toggleViewLess}
            aria-label="view more facets"
            tabIndex={0}
            role={'button'}
        >
            View More
        </div>
    );
};

export default ViewMore;
