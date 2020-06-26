import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import FacetItem from './FacetItem';
import { List } from '../../../../../components'

class GenerateFacets extends React.Component {

    render() {

        const { bucketedFacets,
            addCategoryFilter,
            breadCrumbsList,
            MultilevelFacetItemComponent } = this.props;

        return (bucketedFacets.map(bucketedFacet => {

            const { displayName, level, multiLevelField, values = [] } = bucketedFacet;
            const breadCrumbsLength = breadCrumbsList.length;

            if (breadCrumbsLength === level || breadCrumbsLength > level) {
                return null;
            }

            return (<Fragment>
                <div className='UNX-bucketed-facet-header'>{displayName}</div>
                <List
                    items={values}
                    ListItem={MultilevelFacetItemComponent || FacetItem}
                    idAttribute={name}
                    level={level}
                    multiLevelField={multiLevelField}
                    onClick={addCategoryFilter}
                    className='UNX-bucketed-facet-list-container'
                />
            </Fragment>)
        }))

    }
}

GenerateFacets.propTypes = {
    bucketedFacets: PropTypes.array.isRequired,
    addCategoryFilter: PropTypes.func.isRequired,
    breadCrumbsList: PropTypes.array.isRequired
}

export default GenerateFacets;
