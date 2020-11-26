import { searchEvents, searchStatus } from '../config';
import { trackFacetClick } from '../modules/analytics';
import { getActiveFacets } from '../utils';

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
        const query = unbxdSearchObj.getSearchQuery() || '';
        trackFacetClick(query, getActiveFacets(unbxdSearchObj));
    }

    console.log('unbxdCallBack ', eventName, data);
}

export default unbxdCallBack;
