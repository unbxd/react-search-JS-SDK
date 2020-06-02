import { createContext } from 'react';

const SortContext = createContext();

const SortContextProvider = SortContext.Provider;
const SortContextConsumer = SortContext.Consumer;

export { SortContextProvider, SortContextConsumer }
export default SortContext;