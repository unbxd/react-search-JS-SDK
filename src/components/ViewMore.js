import React from 'react';

const ViewMore = ({ facetName, toggleViewLess, viewLess, ...props }) => {
    return !viewLess ? (
        <div
            className="view-More"
            data-unx_name={facetName}
            onClick={toggleViewLess}
        >
            View Less
        </div>
    ) : (
        <div
            className="view-More"
            data-unx_name={facetName}
            onClick={toggleViewLess}
        >
            View More
        </div>
    );
};

export default ViewMore;
