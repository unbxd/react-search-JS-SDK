import React from 'react';
import RangeSlider from './RangeSlider';
import { RangeFacets } from '@unbxd-ui/react-search-sdk';
import {executeCallback} from './RangeFacetsUtils';
import { getUpdatedRangeFacets } from './RangeFacetsUtils';
import { scrollTop } from '../utils';

const transform = function () {
    console.log(this);
    return this;
};

class RangeView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            rangeFacetsList: [],
            facetChange: false
        };
    }

    setFacetValue(facetObj, getResults = false, onFacetClick, removeRangeFacet, addRangeFacet) {
        const { facetName, valMin, valMax, isSelected } = facetObj;
        const applyMutiple = true;

        const onFinish = () => {
            this.setState((existingState) => {
                let { rangeFacetsList } = existingState;
                if(Object.keys(rangeFacetsList).length === 0){
                    rangeFacetsList = [...rangeFacetsListCopy]
                }
                const updatedRangeFacets = rangeFacetsList.map((rangeValue) => {
                    if (rangeValue.facetName === facetName) {
                        //also go into values and set the specific from to as is selected
                        const updatedValues = rangeValue.values.map(
                            (facetValue) => {
                                return {
                                    ...facetValue,
                                    isSelected: !isSelected,
                                };
                            }
                        );

                        return {
                            ...rangeValue,
                            valMin,
                            valMax,
                            values: updatedValues,
                        };
                    } else {
                        return { ...rangeValue };
                    }
                });

                return {
                    ...existingState,
                    rangeFacetsList: updatedRangeFacets,
                };
            });

            if (isSelected && !applyMutiple) {
                removeRangeFacet({ facetName }, getResults);
            } else {
                addRangeFacet(
                    { facetName, start: valMin, end: valMax },
                    getResults
                );
            }
        };
        executeCallback(onFacetClick, [facetObj, !isSelected], onFinish);
    }

    onApplyFilter = (applyRangeFacet) => {
        applyRangeFacet();
    };

    onClearFilter = (event, applyRangeFacet, removeRangeFacet, rangeFacetsListCopy) => {
        const facetName = event.target.dataset['unx_facetname'];
        const applyMutiple = true;
        removeRangeFacet({ facetName });
        this.setState((currentFacetState) => {
            let { rangeFacetsList } = currentFacetState;
            if(Object.keys(rangeFacetsList).length === 0){
                rangeFacetsList = [...rangeFacetsListCopy]
            }
            const updatedRangeFacets = rangeFacetsList.map((rangeValue) => {
                if (rangeValue.facetName === facetName) {
                    const updatedValues = rangeValue.values.map(
                        (facetValue) => {
                            return { ...facetValue, isSelected: false };
                        }
                    );
                    return {
                        ...rangeValue,
                        isSelected: false,
                        valMin: rangeValue.sliderMin,
                        valMax: rangeValue.sliderMax,
                        values: updatedValues,
                    };
                } else {
                    return { ...rangeValue };
                }
            });

            return {
                ...currentFacetState,
                rangeFacetsList: updatedRangeFacets,
                facetChange: true
            };
        });

        !applyMutiple && this.onApplyFilter(applyRangeFacet);
    };

    handleFacetChange = (event, facetObj, rangeFacetsListCopy, removeRangeFacet, enableApplyFilters, onFacetClick, addRangeFacet) => {
        const facetName = facetObj.facetName;
        removeRangeFacet({ facetName });
        
        let valMin=event[0],valMax = event[1];
        let isSelected = false;

        
        this.setState((existingState) => {
            let { rangeFacetsList } = existingState;
            if(Object.keys(rangeFacetsList).length === 0){
                rangeFacetsList = [...rangeFacetsListCopy]
            }

            const updatedRangeValues = rangeFacetsList.map((rangeValue) => {
                if (rangeValue.facetName === facetName) {
                    valMin = event[0];
                    valMax = event[1];
                    return {
                        ...rangeValue,
                        start: event[0],
                        end: event[1]
                    };

                } else {
                    return { ...rangeValue };
                }
            });

            return {
                ...existingState,
                rangeFacetsList: updatedRangeValues,
                facetChange: true
            };
        });
        const facetObjNew = { facetName, valMin, valMax, isSelected };
        this.setFacetValue(facetObjNew, !enableApplyFilters, onFacetClick, removeRangeFacet, addRangeFacet);

    };

    handleCollapseToggle = (event, rangeFacetsListCopy) => {
        const facetName = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            let { rangeFacetsList } = existingState;
            if(Object.keys(rangeFacetsList).length === 0){
                rangeFacetsList = [...rangeFacetsListCopy]
            }
            const updatedRangeValues = rangeFacetsList.map((rangeValue) => {
                if (rangeValue.facetName === facetName) {
                    return {
                        ...rangeValue,
                        isOpen: !rangeValue.isOpen,
                    };
                } else {
                    return { ...rangeValue };
                }
            });

            return {
                ...existingState,
                rangeFacetsList: updatedRangeValues,
                facetChange: false
            };
        });
    };

    render(){
        return (
            <RangeFacets
                transform={transform}
                collapsible={true}
                enableViewMore={true}
                minViewMore={3}
                //onFacetClick={onFacetClick}
                >
                {({
                    rangeFacets,
                    addRangeFacet,
                    applyRangeFacet,
                    removeRangeFacet,
                    FacetItemComponent,
                    enableApplyFilters,
                    priceUnit,
                    label,
                    collapsible,
                    transform,
                    enableViewMore,
                    onFacetClick,
                    minViewMore,
                    unbxdCore,

                }) => {

                    const { facetChange } = this.state;
                    let rangeFacetsList = [];
                    if(this.state.rangeFacetsList && this.state.rangeFacetsList.length === 0){
                        rangeFacetsList = [...rangeFacets]
                    }else{
                        rangeFacetsList = [...this.state.rangeFacetsList]
                    }
                    const {filter} = unbxdCore.getQueryParams();
                    const ranges = unbxdCore.getSelectedRanges();
                    const matches = String(ranges && ranges.price).match(/\d+/g);

                    if (rangeFacetsList.length === 0) {
                        return null;
                    }
                    return (<div className="UNX-rangefacet__container">
                    {label ? label : null}
    
                    {rangeFacetsList.map((facetObj) => {
                        const {
                            facetName,
                            values,
                            displayName,
                            isSelected,
                            isOpen = true,
                            viewLess,
                            sliderMax,
                            sliderMin, 
                        } = facetObj;
    
                        let {start, end}=facetObj
                        if(matches && matches.length ){
                            start = matches[0];
                            end = matches[1];
                        }
                        if(!ranges || !ranges.price){
                            start = sliderMin;
                            end = sliderMax;
                        }
                        
    
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
                                    </div>
                                </div>
                                <div data-unx_name={facetName}>
                                <RangeSlider
                                    min={sliderMin}
                                    max={sliderMax}
                                    value={[start,end]}
                                    facetName={facetName}
                                    facetObj={facetObj}
                                    handleAfterChange={((event, facetObj)=>{
                                        this.handleFacetChange(event, facetObj,rangeFacetsList, removeRangeFacet, 
                                            enableApplyFilters, onFacetClick, addRangeFacet)
                                    })}
                                    
                                />
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
                }}    
            </RangeFacets>
                
        );
    }
}

export default RangeView;
