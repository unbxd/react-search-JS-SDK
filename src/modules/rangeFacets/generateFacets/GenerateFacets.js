import React from 'react';
import PropTypes from 'prop-types';

import {
    toggleViewLess,
    handleCollapseToggle
} from '../../../common/facetUtils';
import { List, ViewMore } from '../../../components';
import FacetItem from './FacetItem';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);

        const { rangeFacets } = this.props;
        this.state = {
            rangeFacetsList: rangeFacets
        };

        this.toggleViewLess = toggleViewLess.bind(this, 'rangeFacetsList');
        this.handleCollapseToggle = handleCollapseToggle.bind(
            this,
            'rangeFacetsList'
        );
    }

    handleCollapseToggle = (event) => {
        const facetName = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const { rangeFacetsList } = existingState;

            const updatedRangeValues = rangeFacetsList.map((rangeValue) => {
                if (rangeValue.facetName === facetName) {
                    return {
                        ...rangeValue,
                        isOpen: !rangeValue.isOpen
                    };
                } else {
                    return { ...rangeValue };
                }
            });

            return {
                ...existingState,
                rangeFacetsList: updatedRangeValues
            };
        });
    };

    componentDidUpdate(prevProps) {
        const { rangeFacets, transform } = this.props;
        if (prevProps.rangeFacets !== rangeFacets) {
            this.setState((existingState) => {
                const { rangeFacetsList } = existingState;
                const formattedRangeFacets = rangeFacets.map((rangeFacet) => {
                    const matchRangeFacet = rangeFacetsList.find(
                        (facetObj) =>
                            facetObj.facetName === rangeFacet.facetName
                    );
                    return {
                        ...rangeFacet,
                        isOpen: matchRangeFacet ? matchRangeFacet.isOpen : true,
                        viewLess: matchRangeFacet
                            ? matchRangeFacet.viewLess
                            : false
                    };
                });

                if (transform && typeof transform === 'function') {
                    let returnedFacets = transform.call(formattedRangeFacets);
                    return { rangeFacetsList: returnedFacets };
                }
                return { rangeFacetsList: formattedRangeFacets };
            });
        }
    }

    render() {
        const { rangeFacetsList } = this.state;
        const {
            facetItemComponent,
            onFacetClick,
            onFacetClear,
            priceUnit,
            label,
            collapsible,
            enableViewMore,
            minViewMore
        } = this.props;

        if (rangeFacetsList.length === 0) {
            return null;
        }

        return (
            <div className="UNX-rangefacet__container">
                {label ? label : null}

                {rangeFacetsList.map((facetObj) => {
                    const {
                        facetName,
                        values,
                        displayName,
                        isSelected,
                        isOpen = true,
                        viewLess
                    } = facetObj;

                    return (
                        <div
                            className={`UNX-facet__element ${
                                isOpen ? 'open' : ''
                            }`}
                            key={facetName}
                        >
                            <div className="UNX-facet__headerContainer">
                                <div className="UNX-facet__header">
                                    {displayName}
                                    {collapsible && (
                                        <span
                                            className="-collapse-icon"
                                            data-unx_name={facetName}
                                            onClick={this.handleCollapseToggle}
                                            tabIndex={0}
                                            role={'button'}
                                            aria-label={`${
                                                isOpen ? 'collapse' : 'open'
                                            } facets`}
                                        />
                                    )}
                                </div>
                            </div>
                            <List
                                items={values}
                                ListItem={facetItemComponent || FacetItem}
                                idAttribute="dataId"
                                onClick={onFacetClick}
                                className={`UNX-facet__list ${
                                    viewLess ? 'UNX-facet__listShowLimited' : ''
                                }`}
                                priceUnit={priceUnit}
                            />
                            {isSelected && (
                                <div
                                    onClick={onFacetClear}
                                    data-unx_facetname={facetName}
                                    className="-clear"
                                >
                                    Clear
                                </div>
                            )}
                            {enableViewMore &&
                            isOpen &&
                            values.length > minViewMore ? (
                                <ViewMore
                                    facetName={facetName}
                                    toggleViewLess={this.toggleViewLess}
                                    viewLess={viewLess}
                                />
                            ) : null}
                        </div>
                    );
                })}
            </div>
        );
    }
}

GenerateFacets.propTypes = {
    rangeFacets: PropTypes.array,
    enableApplyFilters: PropTypes.bool.isRequired,
    addRangeFacet: PropTypes.func.isRequired,
    applyRangeFacet: PropTypes.func.isRequired,
    removeRangeFacet: PropTypes.func.isRequired,
    facetItemComponent: PropTypes.element,
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    applyMultiple: PropTypes.bool,
    transform: PropTypes.func
};

export default GenerateFacets;
