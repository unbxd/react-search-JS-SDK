import React from 'react';
import PropTypes from 'prop-types';

import { listItemTypes } from './utils';

class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = { viewLess: false };     
    }

    toggleViewLess = () => {
        this.setState((existingState) => {
          let currentViewLess = existingState.viewLess;
          return {
            ...existingState,
            viewLess: !currentViewLess
          };
        });
      }

    render (){

        const {
            items,
            activeItem,
            ListItem,
            idAttribute = "id",
            className = '',
            onClick,
            itemsType = listItemTypes.OBJECT,
            facetName,
            combinedFacets,
            multiLevelField,
            bucketedFacets,
            displayName,
            isRangeOpen,
            textFacets
        } = this.props

        const { viewLess } = this.state

        return (
        <div>
            <div className={`${className} ${viewLess? "UNX-facet__listShowLimited":""}` }>
            {items.map((item, idx) => {

                let isActive = false;
                if (itemsType === listItemTypes.PRIMITIVE) {
                    isActive = item === activeItem;
                } else {
                    isActive = typeof activeItem === 'object' ?
                        activeItem[idAttribute] === item[idAttribute] : activeItem === item[idAttribute];

                }


                const key = itemsType === listItemTypes.PRIMITIVE ? item : item[idAttribute];

                return <ListItem
                    itemData={item}
                    idAttribute={key}
                    onClick={onClick ? onClick : null}
                    isActive={isActive}
                    idx={idx}
                    {...this.props}
                    key={key} />
            })}
                
            </div>
            {facetName && combinedFacets && combinedFacets.length && combinedFacets.map((combinedFacet) => {
                if((facetName === combinedFacet.facetName) && (combinedFacet.isOpen))
                {
                    if(!viewLess){
                        return(<div className="view-More"
                            data-unx_name={facetName}
                            onClick={this.toggleViewLess}>
                            View Less
                        </div>)
                    }else{
                        return(<div 
                            className="view-More"
                            data-unx_name={facetName}
                            onClick={this.toggleViewLess}>
                            View More
                        </div>)
                    }
                }
                return ""
            })}
            {facetName &&  textFacets && textFacets.length && textFacets.map((textFacet) => {
                if((facetName === textFacet.facetName) && (textFacet.isOpen))
                {
                    if(!viewLess){
                        return(<div className="view-More"
                            data-unx_name={facetName}
                            onClick={this.toggleViewLess}>
                            View Less
                        </div>)
                    }else{
                        return(<div 
                            className="view-More"
                            data-unx_name={facetName}
                            onClick={this.toggleViewLess}>
                            View More
                        </div>)
                    }
                }
                return ""
            })}
            {facetName && isRangeOpen ? (
                !viewLess ?
                    (<div className="view-More"
                        data-unx_name={facetName}
                        onClick={this.toggleViewLess}>
                        View Less
                    </div>) : (
                    <div 
                        className="view-More"
                        data-unx_name={facetName}
                        onClick={this.toggleViewLess}>
                        View More
                    </div>
                    )
            ): ""}
            {multiLevelField && bucketedFacets && bucketedFacets.length && bucketedFacets.map((bucketedFacet) => {
                if((displayName === bucketedFacet.displayName) && (bucketedFacet.isOpen))
                {
                    if(!viewLess){
                        return(<div className="view-More"
                            data-unx_name={displayName}
                            onClick={this.toggleViewLess}>
                            View Less
                        </div>)
                    }else{
                        return(<div 
                            className="view-More"
                            data-unx_name={displayName}
                            onClick={this.toggleViewLess}>
                            View More
                        </div>)
                    }
                }
                return ""
            })}
            </div>)
        
    }
    
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    activeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    ListItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    idAttribute: PropTypes.string
}

export default List;