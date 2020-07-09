import React from 'react';
import PropTypes from 'prop-types';

import { isFacetSelected } from '../../utils';
import { List } from '../../../../components';
import FacetItem from './FacetItem';

class GenerateFacets extends React.Component {

    componentDidUpdate() {

        const { selectedFacets, lastSelectedFacets, setSelectedFacets, isApplyFilters } = this.props;
        if (selectedFacets !== lastSelectedFacets) {
            setSelectedFacets(isApplyFilters ?
                selectedFacets : lastSelectedFacets);
        }

    }

    render() {

        const { textFacets, selectedFacets, onFacetClick, onFacetObjectReset, FacetItemComponent } = this.props;

        return (<div>{textFacets.map(({ displayName, facetName, values }) => {

            //decide whether to show clear or not
            const hasActiveFacets = selectedFacets[facetName] ? true : false;

            return (<div key={facetName} className='UNX-textFacet__container'>

                <div className='UNX-textFacet__header'
                    data-unx_name={facetName}>
                    {displayName}

                    {hasActiveFacets && <div className='UNX-textFacet__header -clear'
                        data-unx_name={facetName}
                        onClick={onFacetObjectReset}>
                        Clear
                </div>}

                </div>

                <div className='UNX-textFacet__element'>
                    <List items={values}
                        idAttribute={'dataId'}
                        ListItem={FacetItemComponent || FacetItem}
                        onClick={onFacetClick}
                        facetName={facetName}
                        className={'UNX-textFacet__list'}
                        isFacetSelected={isFacetSelected}
                        selectedFacets={selectedFacets}
                    />
                </div>
            </div>)
        })}
        </div>)
    }
}

GenerateFacets.propTypes = {
    textFacets: PropTypes.arrayOf(PropTypes.object),
    selectedFacets: PropTypes.object,
    lastSelectedFacets: PropTypes.object,
    onFacetClick: PropTypes.func.isRequired,
    onFacetObjectReset: PropTypes.func.isRequired,
    setSelectedFacets: PropTypes.func.isRequired,
}

export default GenerateFacets;
