/* global Unbxd */

function getAnalytics() {
    const { enableUnbxdAnalytics } = this.state;

    const onCatch = (e) => {
        console.error('Error tracking::', e);
    };

    const trackSearch = (searchQuery) => {
        if (enableUnbxdAnalytics) {
            try {
                Unbxd.track('search', { query: searchQuery });
            } catch (e) {
                onCatch(e);
            }
        }
    };

    const trackCategory = (unbxdAnalyticsConf) => {
        if (enableUnbxdAnalytics) {
            try {
                Unbxd.track('categoryPage', { ...unbxdAnalyticsConf });
            } catch (e) {
                onCatch(e);
            }
        }
    };

    const trackProductClick = (uniqueId, prank) => {
        if (enableUnbxdAnalytics) {
            try {
                Unbxd.track('click', {
                    pid: uniqueId,
                    prank: prank
                });
            } catch (e) {
                onCatch(e);
            }
        }
    };

    const trackProductImpressions = (query, pids) => {
        if (enableUnbxdAnalytics) {
            try {
                Unbxd.track('search_impression', {
                    query: query,
                    pids_list: pids
                });
            } catch (e) {
                onCatch(e);
            }
        }
    };

    const trackFacetClick = (query, facets) => {
        if (enableUnbxdAnalytics) {
            try {
                Unbxd.track('facets', {
                    query: query,
                    facets: facets
                });
            } catch (e) {
                onCatch(e);
            }
        }
    };

    return {
        trackSearch,
        trackCategory,
        trackProductClick,
        trackProductImpressions,
        trackFacetClick
    };
}

export default getAnalytics;
