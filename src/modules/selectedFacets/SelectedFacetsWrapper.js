import React from 'react';
import PropTypes from 'prop-types';

import FacetItem from './FacetItem';
import { List } from '../../components';

const SelectedFacetsWrapper = (props) => {
    const {
        activeFacets,
        onTextFacetClick,
        onRangeFacetClick,
        facetItemComponent,
        priceUnit,
        label
    } = props;

    const { textFacets, rangeFacets } = activeFacets;

    let activeTextFacetsMarkup = null;
    let activeRangeFacetsMarkup = null;

    if (textFacets.length) {
        activeTextFacetsMarkup = (
            <List
                items={textFacets}
                ListItem={facetItemComponent || FacetItem}
                idAttribute="dataId"
                onClick={onTextFacetClick}
                className="UNX-selectedTextFacets__list"
            />
        );
    }

    if (Object.keys(rangeFacets).length) {
        activeRangeFacetsMarkup = (
            <List
                items={rangeFacets}
                ListItem={facetItemComponent || FacetItem}
                idAttribute="facetName"
                onClick={onRangeFacetClick}
                className="UNX-selectedRangeFacets__list"
                priceUnit={priceUnit}
            />
        );
    }

    if (
        activeTextFacetsMarkup === activeRangeFacetsMarkup &&
        activeTextFacetsMarkup === null
    ) {
        return null;
    }

    return (
        <div className="UNX-selectedFacets__container">
            {label || null}
            <div className="UNX-selectedFacets__list">
                {activeTextFacetsMarkup}
                {activeRangeFacetsMarkup}
            </div>
        </div>
    );
};

SelectedFacetsWrapper.propTypes = {
    activeFacets: PropTypes.object,
    onTextFacetClick: PropTypes.func.isRequired,
    onRangeFacetClick: PropTypes.func.isRequired,
    facetItemComponent: PropTypes.element,
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node
};

export default SelectedFacetsWrapper;
