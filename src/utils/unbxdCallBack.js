import { searchEvents, searchStatus } from '../config';
import getActiveFacets from './getActiveFacets';

function unbxdCallBack(unbxdSearchObj, eventName, data) {
    if (eventName === searchEvents.AFTER_API_CALL) {
        this.setState({
            unbxdCore: unbxdSearchObj,
            unbxdCoreStatus: searchStatus.READY
        });
        const { onRouteChange } = this.props;
        if (typeof onRouteChange === 'function') {
            onRouteChange(unbxdSearchObj, unbxdSearchObj.getStateString());
        }
    }

    if (eventName === searchEvents.BEFORE_API_CALL) {
        this.setState({
            unbxdCore: unbxdSearchObj,
            unbxdCoreStatus: searchStatus.LOADING
        });
    }

    if (eventName === searchEvents.FETCH_ERROR) {
        this.setState({
            unbxdCore: unbxdSearchObj,
            unbxdCoreStatus: searchStatus.ERROR
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
}

export default unbxdCallBack;
