import React from 'react';
import PropTypes from 'prop-types';

import FacetItem from './FacetItem';
import { List } from '../../components';

const SelectedFacetsWrapper = (props) => {
    const {
        activeFacets,
        onTextFacetClick,
        onRangeFacetClick,
        onMultilevelFacetClick,
        FacetItemComponent,
        priceUnit,
        label,
    } = props;

    const { textFacets, rangeFacets, multilevelFacets } = activeFacets;

    let activeTextFacetsMarkup = null;
    let activeRangeFacetsMarkup = null;
    let activeMultilevelFacetsMarkup = null;

    if (textFacets.length) {
        activeTextFacetsMarkup = (
            <List
                items={textFacets}
                ListItem={FacetItemComponent || FacetItem}
                idAttribute={'dataId'}
                onClick={onTextFacetClick}
                className={'UNX-selectedFacets__list'}
            />
        );
    }

    if (Object.keys(rangeFacets).length) {
        activeRangeFacetsMarkup = (
            <List
                items={rangeFacets}
                ListItem={FacetItemComponent || FacetItem}
                idAttribute={'facetName'}
                onClick={onRangeFacetClick}
                className={'UNX-selectedFacets__list'}
                priceUnit={priceUnit}
            />
        );
    }

    if (Object.keys(multilevelFacets).length) {
        activeMultilevelFacetsMarkup = (
            <List
                items={multilevelFacets}
                ListItem={FacetItemComponent || FacetItem}
                idAttribute={'name'}
                onClick={onMultilevelFacetClick}
                className={'UNX-selectedFacets__list'}
            />
        );
    }

    if (
        activeTextFacetsMarkup === activeRangeFacetsMarkup &&
        activeTextFacetsMarkup === activeMultilevelFacetsMarkup &&
        activeTextFacetsMarkup === null
    ) {
        return null;
    }

    return (
        <div className="UNX-selectedFacets__container">
            {label ? label : null}
            {activeTextFacetsMarkup}
            {activeRangeFacetsMarkup}
            {activeMultilevelFacetsMarkup}
        </div>
    );
};

SelectedFacetsWrapper.propTypes = {
    activeFacets: PropTypes.object,
    onTextFacetClick: PropTypes.func.isRequired,
    onRangeFacetClick: PropTypes.func.isRequired,
    onMultilevelFacetClick: PropTypes.func.isRequired,
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
};

export default SelectedFacetsWrapper;
