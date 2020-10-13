import React from 'react';
import PropTypes from 'prop-types';

import { isFacetSelected } from '../utils';
import { List, Input } from '../../../components';
import FacetItem from './FacetItem';
import { searchStatus } from './../../../config';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);
        const { textFacets } = props;
        this.state = { textFacets: textFacets };
    }

    componentDidUpdate(prevProps) {
        const {
            textFacets,
            selectedFacets,
            lastSelectedFacets,
            setSelectedFacets,
            enableApplyFilters,
            unbxdCoreStatus,
            sortTextFacets,
        } = this.props;
        if (
            prevProps.unbxdCoreStatus !== unbxdCoreStatus &&
            unbxdCoreStatus === searchStatus.READY &&
            selectedFacets !== lastSelectedFacets
        ) {
            const formattedTextFacets = textFacets.map((textFacet) => {
                const matchTextFacet = this.state.textFacets.find(
                    (facetObj) => facetObj.facetName === textFacet.facetName
                );
                return {
                    ...textFacet,
                    isOpen: matchTextFacet ? matchTextFacet.isOpen : true,
                    filter: matchTextFacet ? matchTextFacet.filter : '',
                };
            });

            formattedTextFacets.map((textFacet)=>{
                textFacet.viewLess = false;
                textFacet.className = "UNX-facet__list";
                return textFacet;
            })

            if(sortTextFacets && typeof(sortTextFacets) === 'function'){
                let returnedFacets = sortTextFacets.call(formattedTextFacets);
                this.setState(() => {
                    return { textFacets: returnedFacets };
                });
            }else{
                this.setState(() => {
                    return { textFacets: formattedTextFacets };
                });
            }
            

            setSelectedFacets(lastSelectedFacets);
        }
    }

    handleCollapseToggle = (event) => {
        const facetId = event.target.dataset['unx_name'];
        this.setState((currentState) => {
            const updatedTextFacets = currentState.textFacets.map(
                (textFacet) => {
                    if (facetId === textFacet.facetName) {
                        return { ...textFacet, isOpen: !textFacet.isOpen };
                    }
                    return { ...textFacet };
                }
            );

            return { ...currentState, textFacets: updatedTextFacets };
        });
    };

    handleFilterChange = (event) => {
        const facetId = event.target.name;
        const value = event.target.value;
        this.setState((currentState) => {
            const updatedTextFacets = currentState.textFacets.map(
                (textFacet) => {
                    if (facetId === textFacet.facetName) {
                        return { ...textFacet, filter: value.toLowerCase() };
                    }
                    return { ...textFacet };
                }
            );

            return { ...currentState, textFacets: updatedTextFacets };
        });
    };

    toggleViewLess = (event) =>{
        const facetName = event.target.dataset['unx_name'];
        this.setState((textFacetsState) => {
          const interimTextFacets = textFacetsState.textFacets.map((textFacet)=>{ 
            if(textFacet.facetName === facetName){
              const currentFacet = {...textFacet};
              currentFacet['viewLess'] = !currentFacet['viewLess'];
              if(currentFacet['viewLess']){
                currentFacet.className = "UNX-facet__list UNX-facet__listShowLimited"
              }else{
                currentFacet.className = "UNX-facet__list"
              }
              return {...textFacet, viewLess: currentFacet['viewLess'], className: currentFacet["className"]};
            }
            return {...textFacet};
          })
          return {...textFacetsState, textFacets: interimTextFacets}
        });
      }

    render() {
        const {
            selectedFacets,
            onFacetClick,
            onFacetObjectReset,
            FacetItemComponent,
            label,
            collapsible,
            searchable,
            enableViewMore
        } = this.props;

        const { textFacets } = this.state;

        if (textFacets.length === 0) {
            return null;
        }

        return (
            <div className="UNX-textFacet__container">
                {label ? label : null}
                {textFacets.map(
                    ({
                        displayName,
                        facetName,
                        values,
                        isOpen = true,
                        filter = '',
                        viewLess, 
                        className
                    }) => {
                        //decide whether to show clear or not
                        const hasActiveFacets = selectedFacets[facetName]
                            ? true
                            : false;
                        let filteredValues = values;
                        if (filter.length > 0) {
                            filteredValues = values.filter((value) => {
                                return value.name
                                    .toLowerCase()
                                    .includes(filter);
                            });
                        }

                        return (
                            <div
                                className={`UNX-facet__element ${
                                    isOpen ? 'open' : ''
                                }`}
                                key={facetName}
                            >
                                <div
                                    className="UNX-facet__header"
                                    data-unx_name={facetName}
                                >
                                    {displayName}
                                    {collapsible && (
                                        <span
                                            className="-collapse-icon"
                                            data-unx_name={facetName}
                                            onClick={this.handleCollapseToggle}
                                        />
                                    )}
                                </div>
                                {searchable && isOpen && (
                                    <div className="UNX-facetFilter__container">
                                        <Input
                                            className="-input"
                                            value={filter}
                                            name={facetName}
                                            onChange={this.handleFilterChange}
                                            data-testid={'UNX_searchFacets'}
                                        />
                                    </div>
                                )}
                                <List
                                    items={filteredValues}
                                    idAttribute={'dataId'}
                                    ListItem={FacetItemComponent || FacetItem}
                                    onClick={onFacetClick}
                                    facetName={facetName}
                                    className={className}
                                    isFacetSelected={isFacetSelected}
                                    selectedFacets={selectedFacets}
                                />
                                {hasActiveFacets && (
                                    <div
                                        className="-clear"
                                        data-unx_name={facetName}
                                        onClick={onFacetObjectReset}
                                    >
                                        Clear
                                    </div>
                                )}
                                {enableViewMore && isOpen?
                                    (!viewLess) ? (
                                        <div className="view-More"
                                        data-unx_name={facetName}
                                        onClick={this.toggleViewLess}>
                                        View Less
                                        </div>
                                    ):(
                                        <div 
                                        className="view-More"
                                        data-unx_name={facetName}
                                        onClick={this.toggleViewLess}>
                                        View More
                                        </div>
                                    ): ""
                                }
                            </div>
                        );
                    }
                )}
            </div>
        );
    }
}

GenerateFacets.propTypes = {
    textFacets: PropTypes.arrayOf(PropTypes.object),
    selectedFacets: PropTypes.object,
    lastSelectedFacets: PropTypes.object,
    onFacetClick: PropTypes.func.isRequired,
    onFacetObjectReset: PropTypes.func.isRequired,
    setSelectedFacets: PropTypes.func.isRequired,
    enableApplyFilters: PropTypes.bool.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    label: PropTypes.node,
    collapsible: PropTypes.bool.isRequired,
    searchable: PropTypes.bool.isRequired,
};

export default GenerateFacets;
