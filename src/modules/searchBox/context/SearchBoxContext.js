import { createContext } from 'react';

const SearchBox = createContext();

const SearchBoxContextProvider = SearchBox.Provider;
const SearchBoxContextConsumer = SearchBox.Consumer;

export { SearchBoxContextProvider, SearchBoxContextConsumer }
export default SearchBox;
