import { createContext } from 'react';

const PaginationContext = createContext();

const PaginationContextProvider = PaginationContext.Provider;
const PaginationContextConsumer = PaginationContext.Consumer;

export { PaginationContextProvider, PaginationContextConsumer }
export default PaginationContext;