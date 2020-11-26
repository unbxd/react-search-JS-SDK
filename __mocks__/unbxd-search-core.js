const UnbxdSearch = jest.genMockFromModule('@unbxd-ui/unbxd-search-core');
const getSearchResults = jest.fn(function () {
    console.log('Being called!!!!')
    return 'hello';
})
console.log('Reachedddd');
UnbxdSearch.getSearchResults = getSearchResults;

export default UnbxdSearch;
