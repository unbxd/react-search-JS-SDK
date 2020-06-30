import React from 'react';

import { FacetsContextConsumer } from '../context';
import SelectedFacetItem from './SelectedFacetItem';
import { List } from '../../../components';

const SelectedFacets = () => {
    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { selectedFacets, moveFacetsOnSelect } = data;
            const { onFacetClick, SelectedFacetItemComponent } = helpers;


            if (!moveFacetsOnSelect) {
                return null;
            }

            return (<div className='UNX-active-facets-container'>
                {Object.keys(selectedFacets).map((facetName) => {

                    const selectedValues = selectedFacets[facetName] || [];

                    return <List items={selectedValues}
                        idAttribute={'dataId'}
                        ListItem={SelectedFacetItemComponent || SelectedFacetItem}
                        onClick={onFacetClick}
                        facetName={facetName}
                        className={'UNX-active-facet-container'}
                    />

                })}</div>)
        }
        }
    </FacetsContextConsumer>)
}

export default SelectedFacets; 
