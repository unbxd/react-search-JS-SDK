import { createContext } from 'react';

const FacetsContext = createContext();

const FacetsContextProvider = FacetsContext.Provider;
const FacetsContextConsumer = FacetsContext.Consumer;

export { FacetsContextProvider, FacetsContextConsumer }
export default FacetsContext;