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

            return (<div className='UNX-selectedFacet__container'>
                {Object.keys(selectedFacets).map((facetName) => {

                    const selectedValues = selectedFacets[facetName] || [];

                    return <List items={selectedValues}
                        idAttribute={'dataId'}
                        ListItem={SelectedFacetItemComponent || SelectedFacetItem}
                        onClick={onFacetClick}
                        facetName={facetName}
                        className={'UNX-selectedFacet__list'}
                    />

                })}</div>)
        }
        }
    </FacetsContextConsumer>)
}

export default SelectedFacets; 
