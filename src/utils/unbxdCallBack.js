import { searchEvents, searchStatus } from '../config';
import getActiveFacets from './getActiveFacets';

function unbxdCallBack(unbxdSearchObj, eventName, data) {
    if (eventName === searchEvents.AFTER_API_CALL) {
        this.setState({
            unbxdCore: unbxdSearchObj,
            unbxdCoreStatus: searchStatus.READY
        });
    }

    if (eventName === searchEvents.BEFORE_API_CALL) {
        this.setState({
            unbxdCore: unbxdSearchObj,
            unbxdCoreStatus: searchStatus.LOADING
        });
    }

    if (eventName === searchEvents.ADDED_FACET) {
        const {
            helpers: { getAnalytics },
            unbxdState
        } = this.state;
        const { trackFacetClick } = getAnalytics();
        const { enableApplyFilters } = unbxdState;
        const query = unbxdSearchObj.getSearchQuery() || '';
        if (!enableApplyFilters) {
            trackFacetClick(query, getActiveFacets(unbxdSearchObj));
        }
    }

    console.log('unbxdCallBack ', eventName, data);
}

export default unbxdCallBack;
