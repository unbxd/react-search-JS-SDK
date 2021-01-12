import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getFacetCoreMethods } from './utils';
import SelectedFacetsWrapper from './SelectedFacetsWrapper';
import { facetTypes } from '../../config';
import { manageStateTypes } from '../../config/constants';

class SelectedFacetsContainer extends React.PureComponent {
    getSelectedFacetsProps = () => {
        const {
            unbxdCore,
            facetItemComponent,
            priceUnit,
            label,
            getUpdatedResults,
            helpers,
            applyMultiple
        } = this.props;

        const {
            getSelectedFacets,
            selectedRangeFacets,
            getFacets,
            deleteAFacet,
            clearARangeFacet,
            setRangeFacet,
            applyRangeFacet
        } = getFacetCoreMethods(unbxdCore);

        const textFacets = getFacets();
        const selectedTextFacets = getSelectedFacets();
        const { manageTextFacets, manageRangeFacets } = helpers;

        const removeTextFacet = (facetName, dataId) => {
            deleteAFacet(facetName, dataId);
            getUpdatedResults();
        };

        const handleTextFacetClick = (currentItem) => {
            const { facetName, dataId } = currentItem;
            removeTextFacet(facetName, dataId);
            manageTextFacets(
                currentItem,
                facetName,
                dataId,
                manageStateTypes.REMOVE
            );
        };

        const handleRangeFacetClick = (currentItem) => {
            const { facetName, dataId } = currentItem;
            const [from, to] =
                typeof dataId === 'string' ? dataId.split(' TO ') : '';
            const start = parseInt(from);
            const end = parseInt(to);
            if (applyMultiple) {
                setRangeFacet({ facetName, start, end, applyMultiple });
            } else {
                clearARangeFacet(facetName);
            }
            manageRangeFacets(
                currentItem,
                facetName,
                dataId,
                manageStateTypes.REMOVE
            );
            applyRangeFacet();
        };


        const activeFacets = {};
        activeFacets['textFacets'] = [];
        textFacets.map(({ facetName, values }) => {
            if (selectedTextFacets[facetName]) {
                selectedTextFacets[facetName].map((selectedFacet) => {
                    return values.find(({ dataId }) => {
                        if (dataId === selectedFacet['dataId']) {
                            activeFacets['textFacets'].push({
                                ...selectedFacet,
                                facetName,
                                type: facetTypes.TEXT_FACET
                            });
                            return true;
                        }
                    });
                });
            }
        });

        activeFacets['rangeFacets'] = [];
        Object.keys(selectedRangeFacets).map((facetName) => {
            const values = selectedRangeFacets[facetName];
            values.map((facetValues) => {
                const name = facetValues.replace(/[\[\]']/g, '');
                activeFacets['rangeFacets'].push({
                    facetName,
                    dataId: name,
                    type: facetTypes.RANGE_FACET
                });
            });
        });

        return {
            activeFacets,
            onTextFacetClick: handleTextFacetClick,
            onRangeFacetClick: handleRangeFacetClick,
            manageTextFacets,
            manageRangeFacets,
            facetItemComponent,
            priceUnit,
            label
        };
    };

    render() {
        const DefaultRender = SelectedFacetsWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getSelectedFacetsProps(),
            DefaultRender
        );
    }
}

SelectedFacetsContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    facetItemComponent: PropTypes.element,
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
    getUpdatedResults: PropTypes.func.isRequired,
    productType: PropTypes.string.isRequired
};

export default SelectedFacetsContainer;
