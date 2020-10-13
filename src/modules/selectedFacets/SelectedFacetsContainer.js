import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getFacetCoreMethods } from './utils';
import SelectedFacetsWrapper from './SelectedFacetsWrapper';
import { productTypes } from '../../config';

class SelectedFacetsContainer extends React.PureComponent {
    getSelectedFacetsProps = () => {
        const {
            unbxdCore,
            FacetItemComponent,
            priceUnit,
            label,
            getUpdatedResults,
            productType,
        } = this.props;

        const {
            getSelectedFacets,
            selectedRangeFacets,
            getFacets,
            deleteAFacet,
            clearARangeFacet,
            setRangeFacet,
            applyRangeFacet,
            getBreadCrumbsList,
            deleteCategoryFilter,
        } = getFacetCoreMethods(unbxdCore);

        const textFacets = getFacets();
        const selectedTextFacets = getSelectedFacets();
        const multilevelFacets = getBreadCrumbsList();

        const removeTextFacet = (facetName, dataId) => {
            deleteAFacet(facetName, dataId);
            getUpdatedResults();
        };

        const removeRangeFacet = (facetName) => {
            //call addRangeFacet from here
            clearARangeFacet(facetName);
            applyRangeFacet();
        };

        const addRangeFacet = (facetName, dataid) => {
            const [from, to] =
                typeof dataid === 'string' ? dataid.split(' TO ') : '';
            const start = parseInt(from);
            const end = parseInt(to);
            const applyMultiple = true;
            setRangeFacet({ facetName, start, end, applyMultiple });
            applyRangeFacet();
        };

        const removeMultilevelFacet = (parent, name, level) => {
            deleteCategoryFilter({ parent, name, level });
            getUpdatedResults();
        };

        const handleTextFacetClick = (event) => {
            const { unx_name, unx_dataid } = event.target.dataset;
            removeTextFacet(unx_name, unx_dataid);
        };

        const handleRangeFacetClick = (event) => {
            const { unx_name, unx_dataid } = event.target.dataset;
            addRangeFacet(unx_name, unx_dataid);
        };

        const handleMultilevelFacetClick = (event) => {
            const {
                unx_categoryname: name,
                unx_level: level,
                unx_multilevelfield: parent,
            } = event.target.dataset;
            const categoryObject = { parent, level, name };
            if (productType === productTypes.CATEGORY) {
                unbxdCore.setCategoryId(categoryObject, unbxdCore);
                getUpdatedResults();
            } else {
                removeMultilevelFacet(parent, level, name);
            }
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
                            });
                            return true;
                        }
                    });
                });
            }
        });

        activeFacets['rangeFacets'] = [];
        Object.keys(selectedRangeFacets).map((facetName) => {
            const values = selectedRangeFacets[facetName]; //[0].replace(/[\[\]']/g, '');
            values.map((facetValues) => {
                const name = facetValues.replace(/[\[\]']/g, '');
                activeFacets['rangeFacets'].push({ facetName, name });
            });
        });

        activeFacets['multilevelFacets'] = [];
        multilevelFacets.map((facetValue) => {
            const { value: name, filterField, level } = facetValue;
            activeFacets['multilevelFacets'].push({ name, filterField, level });
        });

        return {
            activeFacets,
            handleTextFacetClick,
            handleRangeFacetClick,
            handleMultilevelFacetClick,
            FacetItemComponent,
            priceUnit,
            label,
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
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
    getUpdatedResults: PropTypes.func.isRequired,
    productType: PropTypes.string.isRequired,
};

export default SelectedFacetsContainer;
