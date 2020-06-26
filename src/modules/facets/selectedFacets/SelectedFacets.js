import React from 'react';

import { FacetsContextConsumer } from '../context';
import ActiveFacetItem from './ActiveFacetItem';
import { Button, List } from '../../../components';

const SelectedFacets = () => {
    return (<FacetsContextConsumer>
        {({ data, helpers }) => {

            const { selectedFacets, moveFacetsOnSelect } = data;
            const { onFacetClick, ActiveFacetItemComponent } = helpers;


            if (!moveFacetsOnSelect) {
                return null;
            }

            return (<div className='UNX-active-facets-container'>
                {Object.keys(selectedFacets).map((facetName) => {

                    const selectedValues = selectedFacets[facetName] || [];

                    return <List items={selectedValues}
                        idAttribute={'dataId'}
                        ListItem={ActiveFacetItemComponent || ActiveFacetItem}
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
